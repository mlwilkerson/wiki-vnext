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
    /**
     * CREATE SITE
     */
    async createSite (obj, args) {
      try {
        // -> Validate inputs
        if (!args.hostname || args.hostname.length < 2 || !/^(\\*)|([a-z0-9\-.:]+)$/.test(args.hostname)) {
          throw WIKI.ERROR(new Error('Invalid Site Hostname'), 'SiteCreateInvalidHostname')
        }
        if (!args.title || args.title.length < 1 || !/^[^<>"]+$/.test(args.title)) {
          throw WIKI.ERROR(new Error('Invalid Site Title'), 'SiteCreateInvalidTitle')
        }
        // -> Check for duplicate catch-all
        if (args.hostname === '*') {
          const site = await WIKI.models.sites.query().where({
            hostname: args.hostname
          }).first()
          if (site) {
            throw WIKI.ERROR(new Error('A site with a catch-all hostname already exists! Cannot have 2 catch-all hostnames.'), 'SiteCreateDuplicateCatchAll')
          }
        }
        // -> Create site
        const newSite = await WIKI.models.sites.createSite(args.hostname, {
          title: args.title
        })
        return {
          status: graphHelper.generateSuccess('Site created successfully'),
          site: newSite
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    },
    /**
     * UPDATE SITE
     */
    async updateSite (obj, args) {
      try {
        // -> Load site
        const site = await WIKI.models.sites.query().findById(args.id)
        if (!site) {
          throw WIKI.ERROR(new Error('Invalid Site ID'), 'SiteInvalidId')
        }
        // -> Check for duplicate catch-all
        if (args.hostname === '*' && site.hostname !== '*') {
          const dupSite = await WIKI.models.sites.query().where({ hostname: '*' }).first()
          if (dupSite) {
            throw WIKI.ERROR(new Error(`Site ${dupSite.config.title} with a catch-all hostname already exists! Cannot have 2 catch-all hostnames.`), 'SiteUpdateDuplicateCatchAll')
          }
        }
        // -> Update site
        // TODO: UPDATE SITE
        return {
          status: graphHelper.generateSuccess('Site updated successfully')
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    },
    /**
     * DELETE SITE
     */
    async deleteSite (obj, args) {
      try {
        // -> Ensure site isn't last one
        const sitesCount = await WIKI.models.sites.query().count('id').first()
        if (sitesCount?.count && _.toNumber(sitesCount?.count) <= 1) {
          throw WIKI.ERROR(new Error('Cannot delete the last site. At least 1 site must exists at all times.'), 'SiteDeleteLastSite')
        }
        // -> Delete site
        await WIKI.models.sites.deleteSite(args.id)
        return {
          status: graphHelper.generateSuccess('Site deleted successfully')
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    }
  }
}
