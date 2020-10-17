// ===========================================
// Wiki.js
// Licensed under AGPLv3
// ===========================================

const path = require('path')
const { nanoid } = require('nanoid')
const { DateTime } = require('luxon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const mwSecurity = require('./middlewares/security')

const WIKI = {
  IS_DEBUG: process.env.NODE_ENV === 'development',
  IS_MAIN: true,
  ROOTPATH: process.cwd(),
  INSTANCE_ID: nanoid(10),
  SERVERPATH: path.join(process.cwd(), 'server'),
  Error: require('./helpers/error'),
  configSvc: require('./core/config'),
  kernel: require('./core/kernel'),
  startedAt: DateTime.utc(),
  app: express()
}
global.WIKI = WIKI

WIKI.configSvc.init()

// ----------------------------------------
// Init Logger
// ----------------------------------------

WIKI.logger = require('./core/logger').init('MAIN')

// ----------------------------------------
// Start Kernel
// ----------------------------------------

WIKI.kernel.init().then(async () => {
  // -> Express Middlewares
  WIKI.app.use(compression())
  WIKI.app.use(cookieParser())
  WIKI.app.use(cors(WIKI.config.cors))
  WIKI.app.use(WIKI.auth.passport.initialize())
  WIKI.app.use(WIKI.auth.authenticate)
  WIKI.app.use(bodyParser.json({ limit: '1mb' }))

  // -> Security Middlewares
  WIKI.app.use(mwSecurity)
  if (WIKI.config.security.securityTrustProxy) {
    WIKI.app.enable('trust proxy')
  }

  // -> GraphQL Server
  await WIKI.servers.startGraphQL()

  // -> Error Handling
  WIKI.app.use((req, res, next) => {
    var err = new Error('Not Found')
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
