
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('categories', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('parentId').references('id')
            .inTable('categories')
        table.timestamp('createAt')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories')
};
