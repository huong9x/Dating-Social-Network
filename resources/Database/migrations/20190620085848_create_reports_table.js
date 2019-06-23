exports.up = function(knex, Promise) {
    return knex.schema.hasTable('reports').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('reports', function (table) {
                table.increments('id');
                table.integer('user_id');
                table.string('content');
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reports');
};
