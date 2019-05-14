const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'co', password: bcrypt.hashSync('123', 10), first_name: 'Quoc Co', last_name: 'Nguyen', gender: 'Male', email: 'co@dating.com', phone_number: 0911147296},
        {username: 'khoi', password: bcrypt.hashSync('456', 10), first_name: 'Manh Khoi', last_name: 'Nguyen', gender: 'Male', email: 'khoi@dating.com', phone_number: 0964945997},
        {username: 'quang', password: bcrypt.hashSync('789', 10), first_name: 'Manh Quang', last_name: 'Le', gender: 'Male', email: 'quang@dating.com', phone_number: 0966603139}
      ]);
    });
};
