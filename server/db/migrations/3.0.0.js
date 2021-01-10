/* global WIKI */

exports.up = async knex => {
  const dbCompat = {
    charset: (WIKI.config.db.type === 'mysql' || WIKI.config.db.type === 'mariadb')
  }
  await knex.schema
    .createTable('sites', table => {
      if (dbCompat.charset) { table.charset('utf8mb4') }
      table.increments('id').primary()
      table.string('hostname').notNullable()
      table.boolean('isEnabled').notNullable().defaultTo(false)
      table.json('config').notNullable()
    })
  await knex('sites').insert({
    id: 1,
    hostname: '*',
    isEnabled: true,
    config: {
      title: 'My Wiki Site',
      description: '',
      company: '',
      contentLicense: '',
      logoUrl: '',
      robots: [],
      pageComments: true,
      pageRatings: 'off',
      locale: 'en'
    }
  })
  await knex.schema
    .alterTable('navigation', table => {
      table.integer('siteId').notNullable().defaultTo(1).references('id').inTable('sites')
    })
  await knex.schema
    .alterTable('pages', table => {
      table.integer('siteId').notNullable().defaultTo(1).references('id').inTable('sites')
    })
  await knex.schema
    .alterTable('tags', table => {
      table.integer('siteId').notNullable().defaultTo(1).references('id').inTable('sites')
    })
}

exports.down = knex => { }
