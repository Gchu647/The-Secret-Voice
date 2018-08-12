const router = require('express').Router();
const passport = require('passport');
const knex = require('../db/knex');

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login'
  })
);

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  //search for any matching users with the same username
  knex('users')
    .where({ username })
    .select()
    .then(matchedUser => {
      // if there is a user with the same username
      // redirect to register page
      if (matchedUser.length !== 0) {
        res.redirect('/auth/register');

        // else save user to database and log user in
      } else {
        knex('users')
          .returning('*')
          .insert({ username, password })
          .then(user => {
            req.login(user.id, () => {
              res.redirect('/');
            });
          });
      }
    });
});

module.exports = router;
