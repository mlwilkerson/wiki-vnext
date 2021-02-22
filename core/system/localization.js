const _ = require('lodash')
const dotize = require('dotize')
const i18next = require('i18next')
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

/* global WIKI */

module.exports = {
  engine: null,
  namespaces: [],
  init () {
    this.namespaces = WIKI.data.localeNamespaces
    this.engine = i18next
    this.engine.init({
      load: 'languageOnly',
      ns: this.namespaces,
      defaultNS: 'common',
      saveMissing: false,
      lng: WIKI.config.lang.code,
      fallbackLng: 'en'
    })

    // Load current language + namespaces
    this.refreshNamespaces(true)

    return this
  },
  /**
   * Get all entries for a specific locale and namespace
   *
   * @param {String} locale Locale code
   * @param {String} namespace Namespace
   */
  async getByNamespace (locale, namespace) {
    if (this.engine.hasResourceBundle(locale, namespace)) {
      const data = this.engine.getResourceBundle(locale, namespace)
      return _.map(dotize.convert(data), (value, key) => {
        return {
          key,
          value
        }
      })
    } else {
      throw new Error('Invalid locale or namespace')
    }
  },
  /**
   * Load entries from the DB for a single locale
   *
   * @param {String} locale Locale code
   * @param {*} opts Additional options
   */
  async loadLocale (locale, opts = { silent: false }) {
    const res = await WIKI.models.locales.query().findOne('code', locale)
    if (res) {
      if (_.isPlainObject(res.strings)) {
        _.forOwn(res.strings, (data, ns) => {
          this.namespaces.push(ns)
          this.engine.addResourceBundle(locale, ns, data, true, true)
        })
      }
    } else if (!opts.silent) {
      throw new Error('No such locale in local store.')
    }

    // -> Load dev locale files if present
    if (WIKI.IS_DEBUG) {
      try {
        const devEntriesRaw = await fs.readFile(path.join(process.cwd(), `locales/${locale}.yml`), 'utf8')
        if (devEntriesRaw) {
          const devEntries = yaml.safeLoad(devEntriesRaw)
          _.forOwn(devEntries, (data, ns) => {
            this.namespaces.push(ns)
            this.engine.addResourceBundle(locale, ns, data, true, true)
          })
          WIKI.logger.info(`Loaded dev locales from ${locale}.yml`)
        }
      } catch (err) {
        // ignore
      }
    }
  },
  /**
   * Reload all namespaces for all active locales from the DB
   *
   * @param {Boolean} silent No error on fail
   */
  async refreshNamespaces (silent = false) {
    await this.loadLocale(WIKI.config.lang.code, { silent })
    if (WIKI.config.lang.namespacing) {
      for (const ns of WIKI.config.lang.namespaces) {
        await this.loadLocale(ns, { silent })
      }
    }
  },
  /**
   * Set the active locale
   *
   * @param {String} locale Locale code
   */
  async setCurrentLocale (locale) {
    await Promise.fromCallback(cb => {
      return this.engine.changeLanguage(locale, cb)
    })
  }
}
