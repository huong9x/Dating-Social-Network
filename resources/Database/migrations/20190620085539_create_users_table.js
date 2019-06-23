exports.up = function(knex, Promise) {
    return knex.schema.hasTable('users').then(function (exists) {
        if(!exists) {
            return knex.schema.createTable('users', function (table) {
                table.increments('id');
                table.string('username').unique();
                table.string('password');
                table.string('first_name');
                table.string('last_name');
                table.date('birth_date');
                table.string('gender', 10);
                table.string('email');
                table.string('relationship', 255);
                table.string('phone_number', 15);
                table.string('address');
                table.string('avatar');
                table.string('cover');
            });
        };
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
