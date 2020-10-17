/* global WIKI */

exports.up = async knex => {
  const dbCompat = {
    charset: (WIKI.config.db.type === 'mysql' || WIKI.config.db.type === 'mariadb')
  }
  return knex.schema
    .createTable('sites', table => {
      if (dbCompat.charset) { table.charset('utf8mb4') }
      table.increments('id').primary()
      table.string('hostname').notNullable()
      table.boolean('isEnabled').notNullable().defaultTo(false)
      table.json('config').notNullable()
    })
}

exports.down = knex => { }
