exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.timestamp('createAt')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};