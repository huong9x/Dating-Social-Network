
exports.up = async knex => {
    await knex.schema.createTable('share', table => {
        table.increments('share_id');
        table.integer('user_id');
        table.integer('post_id');
        table.string('content');
        table.datetime('share_time');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('share');
};
