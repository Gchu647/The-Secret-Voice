const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
  })
);

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  knex('users')
    .returning('*')
    .insert({ username, password })
    .then(user => {
      res.redirect('/');
    });
});

module.exports = router;
