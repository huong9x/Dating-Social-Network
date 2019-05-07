
exports.up = async knex => {
    await knex.schema.createTable('videos', table => {
        table.increments('video_id');
        table.string('video_caption');
        table.datetime('video_time');
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('videos');
};
