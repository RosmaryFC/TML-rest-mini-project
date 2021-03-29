
exports.up = function(knex) {
    return knex.schema.createTable('comments', function (table) {
        table.increments('id')
        table.string('comment').notNullable()
        table.integer('post_id').unsigned().notNullable()
        table.timestamps(true,true)

        table.foreign('post_id').references('id').inTable('posts').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};
