
exports.up = async knex => {
    await knex.schema.createTable('comment', table => {
        table.increments('comment_id');
        table.integer('user_id');
        table.integer('post_id');
        table.datetime('comment_time');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('comment');
};
