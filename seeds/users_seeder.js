const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'co', password: bcrypt.hashSync('123', 10), first_name: 'Quốc Cơ', last_name: 'Nguyễn', gender: 'Male', email: 'co@dating.com', phone_number: 0911147296},
        {username: 'khoi', password: bcrypt.hashSync('456', 10)},
        {username: 'quang', password: bcrypt.hashSync('789', 10)}
      ]);
    });
};
