const Model = require('objection').Model
const _ = require('lodash')

/* global WIKI */

/**
 * Site model
 */
module.exports = class Site extends Model {
  static get tableName () { return 'sites' }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['hostname'],

      properties: {
        id: { type: 'integer' },
        hostname: { type: 'string' },
        isActive: { type: 'boolean', default: false }
      }
    }
  }

  static get jsonAttributes () {
    return ['config']
  }

  // static async getById () {
  //   const settings = await WIKI.models.settings.query()
  //   if (settings.length > 0) {
  //     return _.reduce(settings, (res, val, key) => {
  //       _.set(res, val.key, (_.has(val.value, 'v')) ? val.value.v : val.value)
  //       return res
  //     }, {})
  //   } else {
  //     return false
  //   }
  // }
}
