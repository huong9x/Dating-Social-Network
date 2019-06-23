
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('followers').del()
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('likes').del();
    })
    .then(() => {
      return knex('comments').del();
    })
    .then(() => {
      return knex('posts').del();
    })
    .then(() => {
      return knex('location').del();
    })
    .then(() => {
      return knex('medias').del();
    })
    .then(() => {
      return knex('notifications').del();
    })

};