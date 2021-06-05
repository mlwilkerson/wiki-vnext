const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = {
  key: 'sharp',
  title: 'Sharp',
  description: 'Process and transform images. Required to generate thumbnails of uploaded images and perform transformations.',
  async isCompatible () {
    return os.arch() === 'x64'
  },
  isInstalled: false,
  isInstallable: true,
  async check () {
    this.isInstalled = await fs.pathExists(path.join(process.cwd(), 'node_modules/sharp/wiki_installed.txt'))
    return this.isInstalled
  },
  async install () {
    try {
      const { stdout, stderr } = await exec('node install/libvips && node install/dll-copy', {
        cwd: path.join(process.cwd(), 'node_modules/sharp'),
        timeout: 120000,
        windowsHide: true
      })
      await fs.ensureFile(path.join(process.cwd(), 'node_modules/sharp/wiki_installed.txt'))
      this.isInstalled = true
      WIKI.logger.info(stdout)
      WIKI.logger.warn(stderr)
    } catch (err) {
      WIKI.logger.error(err)
    }
  }
}
