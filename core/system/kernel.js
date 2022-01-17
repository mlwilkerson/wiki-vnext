const _ = require('lodash')
const EventEmitter = require('eventemitter2').EventEmitter2

/* global WIKI */

module.exports = {
  async init () {
    WIKI.logger.info('=======================================')
    WIKI.logger.info(`= Wiki.js ${_.padEnd(WIKI.version + ' ', 29, '=')}`)
    WIKI.logger.info('=======================================')
    WIKI.logger.info('Initializing...')

    process.on('unhandledRejection', (err) => {
      WIKI.logger.warn(err)
    })
    process.on('uncaughtException', (err) => {
      WIKI.logger.warn(err)
    })

    // -> DB init

    WIKI.models = require('./db').init()

    try {
      await WIKI.models.onReady
      await WIKI.configSvc.loadFromDb()
    } catch (err) {
      WIKI.logger.error('Database Initialization Error: ' + err.message)
      if (WIKI.IS_DEBUG) {
        console.error(err)
      }
      process.exit(1)
    }

    try {
      // -> Initialize core modules

      WIKI.sideloader = await require('./sideloader').init()
      WIKI.cache = require('./cache').init()
      WIKI.scheduler = require('./scheduler').init()
      WIKI.servers = require('./servers')
      WIKI.events = {
        inbound: new EventEmitter(),
        outbound: new EventEmitter()
      }
      WIKI.extensions = require('./extensions')
      WIKI.asar = require('./asar')
      WIKI.auth = require('./auth').init()
      WIKI.mail = require('./mail').init()
      WIKI.system = require('./system').init()

      // await WIKI.models.analytics.refreshProvidersFromDisk()
      // await WIKI.models.authentication.refreshStrategiesFromDisk()
      // await WIKI.models.commentProviders.refreshProvidersFromDisk()
      // await WIKI.models.loggers.refreshLoggersFromDisk()
      // await WIKI.models.renderers.refreshRenderersFromDisk()
      // await WIKI.models.searchEngines.refreshSearchEnginesFromDisk()
      await WIKI.models.storage.refreshTargetsFromDisk()

      await WIKI.extensions.init()

      // await WIKI.auth.activateStrategies()
      // await WIKI.models.commentProviders.initProvider()
      // await WIKI.models.searchEngines.initEngine()
      // await WIKI.models.storage.initTargets()
      WIKI.scheduler.start()

      await WIKI.models.subscribeToNotifications()
    } catch (err) {
      WIKI.logger.error(err)
      process.exit(1)
    }
  },
  /**
   * Graceful shutdown
   */
  async shutdown () {
    if (WIKI.models) {
      await WIKI.models.unsubscribeToNotifications()
      await WIKI.models.knex.client.pool.destroy()
      await WIKI.models.knex.destroy()
    }
    if (WIKI.scheduler) {
      WIKI.scheduler.stop()
    }
    if (WIKI.asar) {
      await WIKI.asar.unload()
    }
    if (WIKI.servers) {
      await WIKI.servers.stopServers()
    }
  }
}
