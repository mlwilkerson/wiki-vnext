const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const autoload = require('auto-load')
const { createRateLimitTypeDef } = require('graphql-rate-limit-directive')

/* global WIKI */

WIKI.logger.info('Loading GraphQL Schema...')

// Schemas

const typeDefs = [createRateLimitTypeDef()]
const schemas = fs.readdirSync(path.join(process.cwd(), 'graph/schemas'))
schemas.forEach(schema => {
  typeDefs.push(fs.readFileSync(path.join(process.cwd(), `graph/schemas/${schema}`), 'utf8'))
})

// Resolvers

const resolvers = {}
const resolversObj = _.values(autoload(path.join(process.cwd(), 'graph/resolvers')))
resolversObj.forEach(resolver => {
  _.merge(resolvers, resolver)
})

// Directives

const schemaDirectives = {
  ...autoload(path.join(process.cwd(), 'graph/directives'))
}

WIKI.logger.info('GraphQL Schema: [ OK ]')

module.exports = {
  typeDefs,
  resolvers,
  schemaDirectives
}
