
exports.up = async knex => {
    await knex.schema.createTable('user_information', table => {
        table.increments('user_info_id');
        table.integer('user_id');
        table.string('ralationship', 50);
        table.string('user_avatar');
        table.integer('phone_number', 15);
        table.string('address');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('user_information');
};
