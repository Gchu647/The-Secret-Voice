const router = require('express').Router();
const passport = require('passport');
const fs = require('file-system');
const knex = require('../db/knex');

router.get('/new', (req, res) => {
  res.render('song');
});

router.post('/new', (req, res) => {
  const originalFileName = req.files.song.name;
  const savedFileName = originalFileName.replace(/ /g, '_');
  const filePath = '/db/audios/' + savedFileName;
  req.files.song.mv('.' + filePath, () => {
    knex('content')
      .insert({
        category: 'music',
        title: originalFileName,
        audio_link: filePath
      })
      .then(() => {
        res.redirect('/');
      });
  });
});

module.exports = router;
