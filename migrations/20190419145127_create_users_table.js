
exports.up = async knex => {
    await knex.schema.createTable('users', table => {
        table.increments('user_id');
        table.string('username').unique();
        table.string('password');
        table.string('first_name');
        table.string('last_name');
        table.date('birth_date');
        table.string('gender', 10);
        table.string('email');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('users');
};
