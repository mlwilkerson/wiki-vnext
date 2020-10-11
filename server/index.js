const path = require('path')
const { nanoid } = require('nanoid')
const { DateTime } = require('luxon')

const WIKI = {
  IS_DEBUG: process.env.NODE_ENV === 'development',
  IS_MAIN: true,
  ROOTPATH: process.cwd(),
  INSTANCE_ID: nanoid(10),
  SERVERPATH: path.join(process.cwd(), 'server'),
  Error: require('./helpers/error'),
  configSvc: require('./core/config'),
  kernel: require('./core/kernel'),
  startedAt: DateTime.utc()
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

WIKI.kernel.init()

// ----------------------------------------
// Handle Express Requests
// ----------------------------------------

// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const cors = require('cors')

// app.use(cookieParser())
// app.use(cors(WIKI.config.cors))
// // app.use(WIKI.auth.passport.initialize())
// // app.use(WIKI.auth.authenticate)
// app.use(bodyParser.json({ limit: '1mb' }))
