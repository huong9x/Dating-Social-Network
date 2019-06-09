
exports.up = async knex => {
    await knex.schema.createTable('post', table => {
        table.increments('post_id');
        table.integer('user_id');
        table.string('content');
        table.integer('like_count');
        table.integer('comment_count');
        table.integer('share_count');
        table.datetime('post_time');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('post');
};
