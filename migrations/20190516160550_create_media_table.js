
exports.up = async knex => {
    await knex.schema.createTable('media', table => {
        table.increments('media_id');
        table.integer('post_id');
        table.integer('user_id');
        table.string('filename', 255);    
        table.string('file_type', 50);    
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('media');
};
