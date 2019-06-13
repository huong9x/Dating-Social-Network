
exports.up = async knex => {
    await knex.schema.createTable('notifications', table => {
        table.increments('notification_id');
        table.integer('user_id');
        table.integer('owner_id');
        table.integer('post_id');
        table.integer('like_id');
        table.integer('comment_id');
        table.integer('post_share_id');
        table.integer('friend_id');
        table.string('friend_type');
        table.string('notification_status');
        table.datetime('notification_time');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('notifications');
};
