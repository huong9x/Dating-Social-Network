exports.up = function(knex, Promise) {
    return knex.schema.hasTable('comments').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('comments', function (table) {
                table.increments('id');
                table.integer('user_id');
                table.integer('post_id');
                table.text('content');
                table.datetime('time');
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');
};
