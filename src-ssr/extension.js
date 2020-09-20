// ===========================================
// Wiki.js
// Licensed under AGPLv3
// ===========================================
/*
 * Note: This file is used for both PRODUCTION & DEVELOPMENT.
 * Note: Changes to this file (but not any file it imports!) are picked up by the
 * development server, but such updates are costly since the dev-server needs a reboot.
 */

const path = require('path')
const { nanoid } = require('nanoid')
const { DateTime } = require('luxon')

const WIKI = {
  IS_DEBUG: process.env.NODE_ENV === 'development',
  IS_MAIN: true,
  ROOTPATH: process.cwd(),
  INSTANCE_ID: nanoid(10),
  SERVERPATH: path.join(process.cwd(), 'src-ssr'),
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

module.exports.extendApp = function ({ app, ssr }) {

}
