exports.up = function(knex, Promise) {
    return knex.schema.hasTable('likes').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('likes', function (table) {
                table.increments('id');
                table.integer('user_id');
                table.integer('post_id');
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('likes');
};
