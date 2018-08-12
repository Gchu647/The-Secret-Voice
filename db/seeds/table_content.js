exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert(makeUsers());
    })
    .then(function() {
      return knex('contents')
        .del()
        .then(function() {
          return knex('contents').insert(makeContent());
        });
    })
    .catch(err => {
      console.log(err.messsage);
    });
};

function makeUsers() {
  let arr = [];

  for (let i = 1; i < 13; i++) {
    arr.push({
      id: i,
      username: `user${i}@hotmail.com`,
      password: `password${i}`
    })
  }

  console.log(arr);
  return arr;
}

function makeContent() {
  let arr = [];

  for (let i = 1; i < 13; i = i + 3) {
    arr.push({
      category: 'music',
      title: 'Freaky Friday',
      audio_link: '/db/audios/freaky_friday.mp3',
      user_id: i
    });
    arr.push({
      category: 'music',
      title: 'Silence',
      audio_link: '/db/audios/marsh_silence.mp3',
      user_id: i + 1
    });
    arr.push({
      category: 'music',
      title: 'This is America',
      audio_link: '/db/audios/this_is_amercia.mp3',
      user_id: i + 2
    });
  }

  return arr;
}
