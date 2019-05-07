
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_information').del()
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('like').del();
    })
    .then(() => {
      return knex('comment').del();
    })
    .then(() => {
      return knex('share').del();
    })
    .then(() => {
      return knex('post').del();
    })
    .then(() => {
      return knex('location').del();
    })
    .then(() => {
      return knex('videos').del();
    })
    .then(() => {
      return knex('images').del();
    })
    .then(() => {
      return knex('notifications').del();
    })
    .then(() => {
      return knex('followers').del();
    })
};
