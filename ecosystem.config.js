const path = require('path')

module.exports = {
  apps : [
    {
      name: 'Core',
      script : './core/index.js',
      cwd: path.join(process.cwd(), 'core'),
      watch: true,
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'UI',
      script : './ui/node_modules/@quasar/cli/bin/quasar',
      cwd: path.join(process.cwd(), 'ui'),
      args: 'dev -m ssr -H local.requarks.io',
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
}
