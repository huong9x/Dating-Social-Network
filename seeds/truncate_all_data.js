
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('followers').del()
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
      return knex('media').del();
    })
    .then(() => {
      return knex('notifications').del();
    })

};
