
exports.up = async knex => {
    await knex.schema.createTable('post', table => {
        table.increments('post_id');
        table.integer('user_id');
        table.string('content');
        table.integer('media_id');
        table.datetime('post_time');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('post');
};
