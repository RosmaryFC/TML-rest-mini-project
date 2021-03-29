
exports.up = function(knex) {
    return knex.schema.createTable('comments', function (table) {
        table.increments('id')
        table.string('comment').notNullable()
        table.integer('business_id').unsigned().notNullable()
        table.integer('post_id').unsigned().notNullable()
        table.timestamps()

        table.foreign('business_id').references('id').inTable('businesses')
        table.foreign('post_id').references('id').inTable('posts')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};
