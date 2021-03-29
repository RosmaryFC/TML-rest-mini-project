
exports.up = function(knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments('id')
        table.string('description').notNullable()
        table.string('url')
        table.integer('business_id').unsigned().notNullable()
        table.timestamps(true,true)

        table.foreign('business_id').references('id').inTable('businesses').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');

};
