
exports.up = function(knex, Promise) {
    return knex.schema.hasTable('followers').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('followers', function (table) {
                table.increments('id');
                table.integer('user_id');
                table.integer('friend_id');
                table.string('status')
                table.datetime('friend_since');
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('followers');
};
