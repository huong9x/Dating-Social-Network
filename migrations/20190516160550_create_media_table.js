
exports.up = async knex => {
    await knex.schema.createTable('media', table => {
        table.increments('media_id');
        table.integer('post_id');
        table.string('filename', 255);        
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('users');
};
