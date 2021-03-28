
exports.up = function(knex) {
    return knex.schema.createTable('businesses', function (table) {
        table.increments('id')
        table.string('business_name').notNullable()
        table.string('description')
        table.string('logo')
        table.timestamps()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('businesses');
};
