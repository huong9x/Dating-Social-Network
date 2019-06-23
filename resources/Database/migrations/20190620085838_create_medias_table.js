exports.up = function(knex, Promise) {
    return knex.schema.hasTable('medias').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('medias', function (table) {
                table.increments('id');
                table.integer('post_id');
                table.integer('user_id');
                table.string('file_name', 255);
                table.string('file_type', 50);
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('medias');
};
