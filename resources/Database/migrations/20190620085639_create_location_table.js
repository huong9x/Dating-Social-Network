exports.up = function(knex, Promise) {
    return knex.schema.hasTable('location').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('location', function (table) {
                table.increments('id');
                table.integer('user_id');
                table.string('longitude');
                table.string('latitude');
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('location');
};
