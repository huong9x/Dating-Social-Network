
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').truncate();
  await knex('users').insert([
      {name: 'rikky', description: 'the creator'},
      {name: 'lucy', description: 'the contributor'},
  ]);
};
