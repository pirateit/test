
exports.up = function(knex) {
    return knex.schema
    .dropTableIfExists('products')
    .createTable('products', function (table) {
        table.increments('id').unsigned().primary();
        table.string('name', 255).notNullable();
        table.integer('price').unsigned().defaultTo(0);
        table.integer('stock').unsigned().defaultTo(0);
    });
};

exports.down = function(knex) {
  
};
