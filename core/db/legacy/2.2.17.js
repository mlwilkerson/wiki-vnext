exports.up = async knex => {
  await knex.schema
    .alterTable('pageHistory', table => {
      table.string('versionDate').notNullable().defaultTo('')
    })
    .raw('UPDATE "pageHistory" h1 SET "versionDate" = COALESCE((SELECT prev."createdAt" FROM "pageHistory" prev WHERE prev."pageId" = h1."pageId" AND prev.id < h1.id ORDER BY prev.id DESC LIMIT 1), h1."createdAt")')
}

exports.down = knex => { }
