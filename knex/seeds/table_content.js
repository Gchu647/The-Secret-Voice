exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'user1@hotmail.com', password: 'password1' },
        { id: 2, username: 'user2@hotmail.com', password: 'password2' },
        { id: 3, username: 'user3@hotmail.com', password: 'password3' },
        { id: 4, username: 'user4@hotmail.com', password: 'password4' },
        { id: 5, username: 'user5@hotmail.com', password: 'password5' }
      ]);
    });
  // .then(function() {
  //   return knex('content')
  //     .del()
  //     .then(function() {
  //       return knex('content').insert([]);
  //     })
  //     .then(function() {
  //       return knex('likes')
  //         .del()
  //         .then(function() {
  //           return knex('likes').insert([]);
  //         });
  //     });
  // });
};
