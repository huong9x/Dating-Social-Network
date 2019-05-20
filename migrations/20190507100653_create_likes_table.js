
exports.up = async knex => {
    await knex.schema.createTable('likes', table => {
        table.increments('like_id');
        table.integer('user_id');
        table.integer('post_id');
        table.datetime('like_time');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('likes');
};
