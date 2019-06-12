
exports.up = async knex => {
    await knex.schema.createTable('reports', table => {
        table.increments('report_id');
        table.integer('user_id');
        table.string('content');        
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('reports');
};
