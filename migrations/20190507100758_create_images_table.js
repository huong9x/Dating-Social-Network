
exports.up = async knex => {
    await knex.schema.createTable('images', table => {
        table.increments('image_id');
        table.string('image_caption');
        table.datetime('image_time');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('images');
};
