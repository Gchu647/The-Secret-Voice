
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contents', table => {
    table.increments();
    table.string('category').notNull();
    table.string('audioLink').notNull();
    table.integer('user_id').references('users.id')
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contents');
};