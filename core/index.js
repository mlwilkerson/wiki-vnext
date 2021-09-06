// ===========================================
// Wiki.js
// Licensed under AGPLv3
// ===========================================

const crypto = require('crypto')
const { DateTime } = require('luxon')
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const mwSecurity = require('./middlewares/security')
const { processRequest } = require('graphql-upload')
const semver = require('semver')

// ----------------------------------------
// Ensure Node.js compatible version
// ----------------------------------------

if (!semver.gt(process.versions.node, '14.17.0')) {
  console.error('Unsupported/outdated Node.js version! v14 or later required.')
  process.exit(1)
}

// ----------------------------------------
// Declare global namespace
// ----------------------------------------

const WIKI = {
  IS_DEBUG: process.env.NODE_ENV === 'development',
  INSTANCE_ID: crypto.randomBytes(4).toString('hex'),
  STARTED_AT: DateTime.utc(),
  ERROR: require('./helpers/error'),
  configSvc: require('./system/config'),
  kernel: require('./system/kernel'),
  app: express()
}
global.WIKI = WIKI

// ----------------------------------------
// Initialize config object
// ----------------------------------------

WIKI.configSvc.init()

// ----------------------------------------
// Init Logger
// ----------------------------------------

WIKI.logger = require('./system/logger').init()

// ----------------------------------------
// Start Kernel
// ----------------------------------------

WIKI.kernel.init().then(async () => {
  // -> Express Middlewares
  WIKI.app.use(compression())
  WIKI.app.use(cors(WIKI.config.cors))
  // WIKI.app.use(WIKI.auth.passport.initialize())
  // WIKI.app.use(WIKI.auth.authenticate)
  WIKI.app.use(express.json({ limit: '5mb' }))

  // -> Security Middlewares
  WIKI.app.use(mwSecurity)
  if (WIKI.config.security?.securityTrustProxy) {
    WIKI.app.enable('trust proxy')
  }

  // -> Handle File Uploads
  WIKI.app.use(async (req, res, next) => {
    if (!req.is('multipart/form-data')) {
      return next()
    }
    const finished = new Promise((resolve) => req.on('end', resolve))
    const { send } = res

    res.send = (...args) => {
      finished.then(() => {
        res.send = send
        res.send(...args)
      })
    }

    try {
      req.body = await processRequest(req, res, {
        maxFileSize: WIKI.config.uploads.maxFileSize,
        maxFiles: WIKI.config.uploads.maxFiles
      })
      next()
    } catch (err) {
      if (err.status && err.expose) {
        res.status(err.status)
      }
      next(err)
    }
  })

  // -> GraphQL Server
  await WIKI.servers.startGraphQL()

  // -> Error Handling
  WIKI.app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  WIKI.app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      data: {},
      errors: [{
        message: err.message,
        path: []
      }]
    })
  })

  // -> Start HTTP Server(s)

  await WIKI.servers.startHTTP()

  if (WIKI.config.ssl.enabled === true || WIKI.config.ssl.enabled === 'true' || WIKI.config.ssl.enabled === 1 || WIKI.config.ssl.enabled === '1') {
    await WIKI.servers.startHTTPS()
  }
})
