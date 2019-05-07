
exports.up = async knex => {
    await knex.schema.createTable('notifications', table => {
        table.increments('notification_id');
        table.integer('user_id');
        table.integer('post_id');
        table.integer('like_id');
        table.integer('comment_id');
        table.integer('share_id');
        table.integer('friend_ids');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('notifications');
};
