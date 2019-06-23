exports.up = function(knex, Promise) {
    return knex.schema.hasTable('posts').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('posts', function (table) {
                table.increments('id');
                table.integer('user_id');
                table.text('content');
                table.integer('like_count');
                table.integer('comment_count');
                table.integer('share_count');
                table.integer('share_id');
                table.datetime('time');
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('posts');
};
