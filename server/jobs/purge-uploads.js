/* global WIKI */

const fs = require('fs-extra')
const { DateTime } = require('luxon')
const path = require('path')

module.exports = async () => {
  WIKI.logger.info('Purging orphaned upload files...')

  try {
    const uplTempPath = path.resolve(WIKI.ROOTPATH, WIKI.config.dataPath, 'uploads')
    await fs.ensureDir(uplTempPath)
    const ls = await fs.readdir(uplTempPath)
    const fifteenAgo = DateTime.local().minus({ minutes: 15 })

    for (const f of ls) {
      const fStat = fs.stat(path.join(uplTempPath, f))
      if (fStat.isFile() && DateTime.fromJSDate(fStat.ctime) < fifteenAgo) {
        await fs.unlink(path.join(uplTempPath, f))
      }
    }

    WIKI.logger.info('Purging orphaned upload files: [ COMPLETED ]')
  } catch (err) {
    WIKI.logger.error('Purging orphaned upload files: [ FAILED ]')
    WIKI.logger.error(err.message)
  }
}
