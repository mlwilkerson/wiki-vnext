const Model = require('objection').Model
const crypto = require('crypto')
const pem2jwk = require('pem-jwk').pem2jwk
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
        id: { type: 'string' },
        hostname: { type: 'string' },
        isEnabled: { type: 'boolean', default: false }
      }
    }
  }

  static get jsonAttributes () {
    return ['config']
  }

  static async createSite (hostname, config) {
    const secret = crypto.randomBytes(32).toString('hex')
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
        passphrase: secret
      }
    })

    return WIKI.models.sites.query().insertAndFetch({
      hostname,
      isEnabled: true,
      config: _.defaultsDeep(config, {
        auth: {
          audience: `urn:${hostname}`,
          tokenExpiration: '30m',
          tokenRenewal: '14d',
          certs: {
            jwk: pem2jwk(certs.publicKey),
            public: certs.publicKey,
            private: certs.privateKey
          },
          secret
        },
        title: 'My Wiki Site',
        description: '',
        company: '',
        contentLicense: '',
        defaults: {
          timezone: 'America/New_York',
          dateFormat: 'YYYY-MM-DD',
          timeFormat: '12h'
        },
        features: {
          ratings: false,
          ratingsMode: 'off',
          comments: false,
          contributions: false,
          profile: true,
          search: true
        },
        logoUrl: '',
        logoText: true,
        robots: {
          index: true,
          follow: true
        },
        locale: 'en',
        localeNamespacing: false,
        localeNamespaces: [],
        theme: {
          dark: false,
          colorPrimary: '#1976d2',
          colorSecondary: '#02c39a',
          colorAccent: '#f03a47',
          colorHeader: '#000000',
          colorSidebar: '#1976d2',
          injectCSS: '',
          injectHead: '',
          injectBody: '',
          sidebarPosition: 'left',
          tocPosition: 'right',
          showSharingMenu: true,
          showPrintBtn: true
        }
      })
    })
  }

  static async deleteSite (id) {
    return WIKI.models.sites.query().deleteById(id)
  }
}
