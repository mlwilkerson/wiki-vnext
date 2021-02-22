const fs = require('fs-extra')
const path = require('path')

/* global WIKI */

module.exports = {
  updates: {
    channel: 'BETA',
    version: WIKI.version,
    releaseDate: WIKI.releaseDate,
    minimumVersionRequired: '2.0.0-beta.0',
    minimumNodeRequired: '10.12.0'
  },
  init () {
    // Clear content cache
    fs.emptyDir(path.resolve(process.cwd(), WIKI.config.dataPath, 'cache'))

    return this
  }
}
