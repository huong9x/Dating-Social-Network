
exports.up = async knex => {
    await knex.schema.createTable('users', table => {
        table.increments('user_id');
        table.string('username').unique();
        table.integer('password');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('users');
};
