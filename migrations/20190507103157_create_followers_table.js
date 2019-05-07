
exports.up = async knex => {
    await knex.schema.createTable('followers', table => {
        table.increments('follower_id');
        table.integer('user_id');
        table.integer('friend_id');
        table.string('follower_status')

    });
};

exports.down = async knex => {
    await knex.schema.dropTable('followers');
};
