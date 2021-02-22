exports.up = knex => {
  return knex.schema
    .alterTable('pageHistory', table => { })
}

exports.down = knex => { }
