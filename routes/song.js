const router = require('express').Router();
const passport = require('passport');
const fs = require('file-system');
const knex = require('../db/knex');

router.get('/new', (req, res) => {
  res.render('song');
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
