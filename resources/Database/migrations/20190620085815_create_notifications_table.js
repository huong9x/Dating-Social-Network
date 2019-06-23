exports.up = function(knex, Promise) {
    return knex.schema.hasTable('notifications').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('notifications', function (table) {
                table.increments('id');
                table.integer('user_id');
                table.integer('owner_id');
                table.integer('post_id');
                table.integer('like_id');
                table.integer('comment_id');
                table.integer('share_id');
                table.string('friend_type');
                table.string('status');
                table.datetime('time');
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notifications');
};
