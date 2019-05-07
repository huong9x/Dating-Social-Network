
exports.up = async knex => {
    await knex.schema.createTable('location', table => {
        table.increments('location_id');
        table.integer('user_id');
        table.string('coordinate');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('location');
};
