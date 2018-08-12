
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contents', table => {
    table.increments();
    table.string('category').notNull();
    table.string('title').notNull();
    table.string('audio_link').notNull();
    table.integer('user_id').references('users.id');
    table.integer('likes').notNull().defaultTo(0); // updated column when liked
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contents');
};
