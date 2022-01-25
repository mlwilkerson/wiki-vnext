const { Octokit, App } = require('octokit')
const jwt = require('jsonwebtoken')

/* global WIKI */

module.exports = {
  async activated () { },
  async deactivated () { },
  async init () { },
  async setup (id, state) {
    try {
      const gh = new Octokit({
        userAgent: 'wikijs'
      })
      switch (state.step) {
        case 'connect': {
          const resp = await gh.request('POST /app-manifests/{code}/conversions', {
            code: state.code
          })
          if (resp.status > 200 && resp.status < 300) {
            await WIKI.models.storage.query().patch({
              config: {
                appId: resp.data.id,
                appName: resp.data.name,
                appSlug: resp.data.slug,
                appClientId: resp.data.client_id,
                appClientSecret: resp.data.client_secret,
                appWebhookSecret: resp.data.webhook_secret,
                appPem: resp.data.pem,
                appPermissions: resp.data.permissions,
                appEvents: resp.data.events,
                ownerLogin: resp.data.owner?.login,
                ownerId: resp.data.owner?.id
              },
              state: {
                current: 'ok',
                setup: 'pendinginstall'
              }
            }).where('id', id)
            return {
              nextStep: 'installApp',
              url: `https://github.com/apps/${resp.data.slug}/installations/new/permissions?target_id=${resp.data.owner?.id}`
            }
          } else {
            throw new Error('GitHub refused the code or could not be reached.')
          }
        }
        case 'verify': {
          // TODO: Create repo
          // const dasJwt = jwt.sign({
          //   iss: resp.data.id,
          //   exp: Math.floor(Date.now() / 1000) + 300,
          //   iat: Math.floor(Date.now() / 1000) - 60
          // }, resp.data.pem, { algorithm: 'RS256' })
          break
        }
        default: {
          throw new Error('Invalid Setup Step')
        }
      }
    } catch (err) {
      WIKI.logger.warn('GitHub Storage Module Setup Failed:')
      WIKI.logger.warn(err)
      throw err
    }
  },
  async created (page) { },
  async updated (page) { },
  async deleted (page) { },
  async renamed (page) { },
  async assetUploaded (asset) { },
  async assetDeleted (asset) { },
  async assetRenamed (asset) { },
  async getLocalLocation () { },
  async exportAll () { }
}
