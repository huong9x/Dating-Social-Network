
exports.up = async knex => {
    await knex.schema.createTable('users', table => {
        table.increments();
        table.string('name');
        table.string('description');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('users');
};
