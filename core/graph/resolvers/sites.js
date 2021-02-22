const graphHelper = require('../../helpers/graph')
const _ = require('lodash')

/* global WIKI */

module.exports = {
  Query: {
    async sites () {
      const sites = await WIKI.models.sites.query()
      return sites.map(s => ({
        ...s.config,
        id: s.id,
        hostname: s.hostname,
        isEnabled: s.isEnabled
      }))
    },
    async siteById (obj, args) {
      const site = await WIKI.models.sites.query().findById(args.id)
      return site ? {
        ...site.config,
        id: site.id,
        hostname: site.hostname,
        isEnabled: site.isEnabled
      } : null
    },
    async siteByHostname (obj, args) {
      const site = await WIKI.models.sites.query().where({
        hostname: args.hostname
      }).first()
      return site ? {
        ...site.config,
        id: site.id,
        hostname: site.hostname,
        isEnabled: site.isEnabled
      } : null
    }
  },
  Mutation: {
    async createSite (obj, args) { return {} },
    async updateSite (obj, args) {},
    async deleteSite (obj, args) {}
  }
}
