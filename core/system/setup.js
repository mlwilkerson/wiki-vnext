const path = require('path')
const { v4: uuid } = require('uuid')
const Promise = require('bluebird')
const fs = require('fs-extra')
const _ = require('lodash')
const crypto = Promise.promisifyAll(require('crypto'))
const pem2jwk = require('pem-jwk').pem2jwk
const semver = require('semver')

/* global WIKI */

module.exports = async () => {
  try {
    // Set config
    _.set(WIKI.config, 'auth', {
      audience: 'urn:wiki.js',
      tokenExpiration: '30m',
      tokenRenewal: '14d'
    })
    _.set(WIKI.config, 'company', '')
    _.set(WIKI.config, 'features', {
      featurePageRatings: true,
      featurePageComments: true,
      featurePersonalWikis: true
    })
    _.set(WIKI.config, 'graphEndpoint', 'https://graph.requarks.io')
    _.set(WIKI.config, 'host', '')
    _.set(WIKI.config, 'lang', {
      code: 'en',
      autoUpdate: true,
      namespacing: false,
      namespaces: []
    })
    _.set(WIKI.config, 'logo', {
      hasLogo: false,
      logoIsSquare: false
    })
    _.set(WIKI.config, 'mail', {
      senderName: '',
      senderEmail: '',
      host: '',
      port: 465,
      secure: true,
      verifySSL: true,
      user: '',
      pass: '',
      useDKIM: false,
      dkimDomainName: '',
      dkimKeySelector: '',
      dkimPrivateKey: ''
    })
    _.set(WIKI.config, 'seo', {
      description: '',
      robots: ['index', 'follow'],
      analyticsService: '',
      analyticsId: ''
    })
    _.set(WIKI.config, 'sessionSecret', (await crypto.randomBytesAsync(32)).toString('hex'))
    _.set(WIKI.config, 'telemetry', {
      isEnabled: WIKI.config.allowTelemetry !== false,
      clientId: uuid()
    })
    _.set(WIKI.config, 'theming', {
      theme: 'default',
      darkMode: false,
      iconset: 'mdi',
      injectCSS: '',
      injectHead: '',
      injectBody: ''
    })
    _.set(WIKI.config, 'title', 'Wiki.js')

    // Basic checks
    if (!semver.satisfies(process.version, '>=10.12')) {
      throw new Error('Node.js 10.12.x or later required!')
    }

    // Create directory structure
    WIKI.logger.info('Creating data directories...')
    await fs.ensureDir(path.resolve(WIKI.ROOTPATH, WIKI.config.dataPath))
    await fs.emptyDir(path.resolve(WIKI.ROOTPATH, WIKI.config.dataPath, 'cache'))
    await fs.ensureDir(path.resolve(WIKI.ROOTPATH, WIKI.config.dataPath, 'uploads'))

    // Generate certificates
    WIKI.logger.info('Generating certificates...')
    const certs = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: WIKI.config.sessionSecret
      }
    })

    _.set(WIKI.config, 'certs', {
      jwk: pem2jwk(certs.publicKey),
      public: certs.publicKey,
      private: certs.privateKey
    })

    // Save config to DB
    WIKI.logger.info('Persisting config to DB...')
    await WIKI.configSvc.saveToDb([
      'auth',
      'certs',
      'company',
      'features',
      'graphEndpoint',
      'host',
      'lang',
      'logo',
      'mail',
      'seo',
      'sessionSecret',
      'telemetry',
      'theming',
      'uploads',
      'title'
    ], false)

    // Truncate tables (reset from previous failed install)
    await WIKI.models.locales.query().where('code', '!=', 'x').del()
    await WIKI.models.navigation.query().truncate()
    switch (WIKI.config.db.type) {
      case 'postgres':
        await WIKI.models.knex.raw('TRUNCATE groups, users CASCADE')
        break
      case 'mysql':
      case 'mariadb':
        await WIKI.models.groups.query().where('id', '>', 0).del()
        await WIKI.models.users.query().where('id', '>', 0).del()
        await WIKI.models.knex.raw('ALTER TABLE `groups` AUTO_INCREMENT = 1')
        await WIKI.models.knex.raw('ALTER TABLE `users` AUTO_INCREMENT = 1')
        break
      case 'mssql':
        await WIKI.models.groups.query().del()
        await WIKI.models.users.query().del()
        await WIKI.models.knex.raw(`
          IF EXISTS (SELECT * FROM sys.identity_columns WHERE OBJECT_NAME(OBJECT_ID) = 'groups' AND last_value IS NOT NULL)
            DBCC CHECKIDENT ([groups], RESEED, 0)
        `)
        await WIKI.models.knex.raw(`
          IF EXISTS (SELECT * FROM sys.identity_columns WHERE OBJECT_NAME(OBJECT_ID) = 'users' AND last_value IS NOT NULL)
            DBCC CHECKIDENT ([users], RESEED, 0)
        `)
        break
      case 'sqlite':
        await WIKI.models.groups.query().truncate()
        await WIKI.models.users.query().truncate()
        break
    }

    // Create default locale
    WIKI.logger.info('Installing default locale...')
    await WIKI.models.locales.query().insert({
      code: 'en',
      strings: {},
      isRTL: false,
      name: 'English',
      nativeName: 'English'
    })

    // Create default groups

    WIKI.logger.info('Creating default groups...')
    const adminGroup = await WIKI.models.groups.query().insert({
      name: 'Administrators',
      permissions: JSON.stringify(['manage:system']),
      pageRules: JSON.stringify([]),
      isSystem: true
    })
    const guestGroup = await WIKI.models.groups.query().insert({
      name: 'Guests',
      permissions: JSON.stringify(['read:pages', 'read:assets', 'read:comments']),
      pageRules: JSON.stringify([
        { id: 'guest', roles: ['read:pages', 'read:assets', 'read:comments'], match: 'START', deny: false, path: '', locales: [] }
      ]),
      isSystem: true
    })

    // Load local authentication strategy
    await WIKI.models.authentication.query().insert({
      key: 'local',
      config: {},
      selfRegistration: false,
      isEnabled: true,
      domainWhitelist: { v: [] },
      autoEnrollGroups: { v: [] },
      order: 0,
      strategyKey: 'local',
      displayName: 'Local'
    })

    // Load editors + enable default
    await WIKI.models.editors.refreshEditorsFromDisk()
    await WIKI.models.editors.query().patch({ isEnabled: true }).where('key', 'markdown')

    // Load loggers
    await WIKI.models.loggers.refreshLoggersFromDisk()

    // Load renderers
    await WIKI.models.renderers.refreshRenderersFromDisk()

    // Load search engines + enable default
    await WIKI.models.searchEngines.refreshSearchEnginesFromDisk()
    await WIKI.models.searchEngines.query().patch({ isEnabled: true }).where('key', 'db')

    // Load storage targets
    await WIKI.models.storage.refreshTargetsFromDisk()

    // Create root administrator
    WIKI.logger.info('Creating root administrator...')
    const adminUser = await WIKI.models.users.query().insert({
      email: 'admin@example.com',
      provider: 'local',
      password: '12345678',
      name: 'Administrator',
      locale: 'en',
      defaultEditor: 'markdown',
      tfaIsActive: false,
      isActive: true,
      isVerified: true
    })
    await adminUser.$relatedQuery('groups').relate(adminGroup.id)

    // Create Guest account
    WIKI.logger.info('Creating guest account...')
    const guestUser = await WIKI.models.users.query().insert({
      provider: 'local',
      email: 'guest@example.com',
      name: 'Guest',
      password: '',
      locale: 'en',
      defaultEditor: 'markdown',
      tfaIsActive: false,
      isSystem: true,
      isActive: true,
      isVerified: true
    })
    await guestUser.$relatedQuery('groups').relate(guestGroup.id)

    // Create site nav

    WIKI.logger.info('Creating default site navigation')
    await WIKI.models.navigation.query().insert({
      key: 'site',
      config: [
        {
          locale: 'en',
          items: [
            {
              id: uuid(),
              icon: 'mdi-home',
              kind: 'link',
              label: 'Home',
              target: '/',
              targetType: 'home',
              visibilityMode: 'all',
              visibilityGroups: null
            }
          ]
        }
      ]
    })

    WIKI.logger.info('First-time initialization is complete!')

    if (WIKI.config.telemetry.isEnabled) {
      await WIKI.telemetry.sendInstanceEvent('INSTALL')
    }

    WIKI.config.setup = false
  } catch (err) {
    try {
      await WIKI.models.knex('settings').truncate()
    } catch (err) {}
    WIKI.logger.error(err)
    throw err
  }
}
