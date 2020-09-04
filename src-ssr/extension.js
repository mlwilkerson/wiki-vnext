/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Note: This file is used for both PRODUCTION & DEVELOPMENT.
 * Note: Changes to this file (but not any file it imports!) are picked up by the
 * development server, but such updates are costly since the dev-server needs a reboot.
 */

const { postgraphile } = require('postgraphile')
const PgManyToManyPlugin = require('@graphile-contrib/pg-many-to-many')

module.exports.extendApp = function ({ app, ssr }) {
  app.use(
    postgraphile(
      process.env.DATABASE_URL || 'postgres://wikijs:wikijsrocks@localhost:5432/wiki',
      'public',
      {
        watchPg: false,
        graphiql: true,
        enhanceGraphiql: true,
        appendPlugins: [
          require('postgraphile/plugins').TagsFilePlugin,
          PgManyToManyPlugin
        ]
      }
    )
  )
}
