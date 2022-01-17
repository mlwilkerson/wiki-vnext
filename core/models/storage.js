const Model = require('objection').Model
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const yaml = require('js-yaml')

/* global WIKI */

/**
 * Storage model
 */
module.exports = class Storage extends Model {
  static get tableName () { return 'storage' }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['module', 'isEnabled', 'siteId'],

      properties: {
        module: { type: 'string' },
        isEnabled: { type: 'boolean' },
        siteId: { type: 'string' }
      }
    }
  }

  static get jsonAttributes () {
    return ['contentTypes', 'assetDelivery', 'schedule', 'config', 'state']
  }

  static async getTargets ({ siteId }) {
    return WIKI.models.storage.query().where(builder => {
      if (siteId) {
        builder.where('siteId', siteId)
      }
    })
  }

  static async refreshTargetsFromDisk () {
    let trx
    try {
      // -> Fetch definitions from disk
      const storageDirs = await fs.readdir(path.join(process.cwd(), 'modules/storage'))
      WIKI.data.storage = []
      for (const dir of storageDirs) {
        const def = await fs.readFile(path.join(process.cwd(), 'modules/storage', dir, 'definition.yml'), 'utf8')
        const defParsed = yaml.load(def)
        defParsed.key = dir
        WIKI.data.storage.push(defParsed)
        WIKI.logger.debug(`Loaded storage module ${dir}: [ OK ]`)
      }
      WIKI.logger.info(`Loaded ${WIKI.data.storage.length} storage modules: [ OK ]`)
    } catch (err) {
      WIKI.logger.error('Failed to scan or load new storage providers: [ FAILED ]')
      WIKI.logger.error(err)
      if (trx) {
        trx.rollback()
      }
    }
  }

  /**
   * Initialize active storage targets
   */
  static async initTargets () {
    this.targets = await WIKI.models.storage.query().where('isEnabled', true).orderBy('key')
    try {
      // -> Stop and delete existing jobs
      const prevjobs = _.remove(WIKI.scheduler.jobs, job => job.name === 'sync-storage')
      if (prevjobs.length > 0) {
        prevjobs.forEach(job => job.stop())
      }

      // -> Initialize targets
      for (const target of this.targets) {
        const targetDef = _.find(WIKI.data.storage, ['key', target.key])
        target.fn = require(`../modules/storage/${target.key}/storage`)
        target.fn.config = target.config
        target.fn.mode = target.mode
        try {
          await target.fn.init()

          // -> Save succeeded init state
          await WIKI.models.storage.query().patch({
            state: {
              status: 'operational',
              message: '',
              lastAttempt: new Date().toISOString()
            }
          }).where('key', target.key)

          // -> Set recurring sync job
          if (targetDef.schedule && target.syncInterval !== 'P0D') {
            WIKI.scheduler.registerJob({
              name: 'sync-storage',
              immediate: false,
              schedule: target.syncInterval,
              repeat: true
            }, target.key)
          }

          // -> Set internal recurring sync job
          if (targetDef.internalSchedule && targetDef.internalSchedule !== 'P0D') {
            WIKI.scheduler.registerJob({
              name: 'sync-storage',
              immediate: false,
              schedule: target.internalSchedule,
              repeat: true
            }, target.key)
          }
        } catch (err) {
          // -> Save initialization error
          await WIKI.models.storage.query().patch({
            state: {
              status: 'error',
              message: err.message,
              lastAttempt: new Date().toISOString()
            }
          }).where('key', target.key)
        }
      }
    } catch (err) {
      WIKI.logger.warn(err)
      throw err
    }
  }

  static async pageEvent ({ event, page }) {
    try {
      for (const target of this.targets) {
        await target.fn[event](page)
      }
    } catch (err) {
      WIKI.logger.warn(err)
      throw err
    }
  }

  static async assetEvent ({ event, asset }) {
    try {
      for (const target of this.targets) {
        await target.fn[`asset${_.capitalize(event)}`](asset)
      }
    } catch (err) {
      WIKI.logger.warn(err)
      throw err
    }
  }

  static async getLocalLocations ({ asset }) {
    const locations = []
    const promises = this.targets.map(async (target) => {
      try {
        const path = await target.fn.getLocalLocation(asset)
        locations.push({
          path,
          key: target.key
        })
      } catch (err) {
        WIKI.logger.warn(err)
      }
    })
    await Promise.all(promises)
    return locations
  }

  static async executeAction (targetKey, handler) {
    try {
      const target = _.find(this.targets, ['key', targetKey])
      if (target) {
        if (_.hasIn(target.fn, handler)) {
          await target.fn[handler]()
        } else {
          throw new Error('Invalid Handler for Storage Target')
        }
      } else {
        throw new Error('Invalid or Inactive Storage Target')
      }
    } catch (err) {
      WIKI.logger.warn(err)
      throw err
    }
  }
}
