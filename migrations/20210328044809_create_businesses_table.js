
exports.up = function(knex) {
    return knex.schema.createTable('businesses', function (table) {
        table.increments('id')
        table.string('business_name').notNullable()
        table.string('description').notNullable()
        table.string('logo').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('businesses');
};
