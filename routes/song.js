const router = require('express').Router();
const knex = require('../db/knex');

router.get('/new', (req, res) => {
  res.render('song-temp');
});

router.get('/:id', (req, res) => {
  knex.raw(
    `SELECT *
    FROM contents c
    INNER JOIN users u ON c.user_id = u.id
    WHERE c.id = ?`, [req.params.id]
  )
  .then(song => {
    console.log(song.rows[0]);
    // res.send(song.rows);
    res.render('songs/song', { song: song.rows[0] })
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  });
  // res.render('songs/song');
});

router.post('/new', (req, res) => {
  // get original file name
  const originalFileName = req.files.song.name;
  // remove spaces from the file name and replace with underscore
  const savedFileName = originalFileName.replace(/ /g, '_');
  // make a variable for the file path
  const filePath = '/db/audios/' + savedFileName;
  // save the file to ./db/audios/_________
  req.files.song.mv('.' + filePath, () => {
    // add data to database
    knex('content')
      .insert({
        category: 'music',
        title: originalFileName,
        audio_link: filePath
      })
      .then(() => {
        // redirect the user to home route
        res.redirect('/');
      });
  });
});

module.exports = router;
