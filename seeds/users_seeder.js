const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'co', password: bcrypt.hashSync('123', 10), first_name: 'Quốc Cơ', last_name: 'Nguyễn', gender: 'Male', email: 'co@dating.com', phone_number: '0911147296', birth_date: '1997-10-29'},
        {username: 'khoi', password: bcrypt.hashSync('456', 10), first_name: 'Mạnh Khởi', last_name: 'Nguyễn', gender: 'Male', email: 'khoi@dating.com', phone_number: '0964945997', birth_date: '1997-10-25'},
        {username: 'quang', password: bcrypt.hashSync('789', 10), first_name: 'Mạnh Quang', last_name: 'Lê', gender: 'Male', email: 'quang@dating.com', phone_number: '0966603139',  birth_date: '1997-01-08'}
      ]);
    });
};