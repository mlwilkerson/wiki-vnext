const fs = require('fs-extra')
const path = require('path')

/* global WIKI */

module.exports = {
  updates: {
    channel: 'BETA',
    version: WIKI.version,
    releaseDate: WIKI.releaseDate,
    minimumVersionRequired: '2.5.0',
    minimumNodeRequired: '14.12.0'
  },
  init () {
    WIKI.logger.info(`App data will be stored at path ${path.resolve(process.cwd(), WIKI.config.dataPath)}`)
    // Create app data directory
    fs.ensureDir(path.resolve(process.cwd(), WIKI.config.dataPath))
    fs.ensureDir(path.resolve(process.cwd(), WIKI.config.dataPath, 'assets'))
    // Clear content cache
    fs.emptyDir(path.resolve(process.cwd(), WIKI.config.dataPath, 'cache'))

    return this
  }
}
