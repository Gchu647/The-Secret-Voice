const passport = require('passport');
const knex = require('./db/knex');
const Strategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});

passport.use(
  new Strategy(function(username, password, done) {
    console.log('strategy username: ', username);
    console.log('strategy password: ', password);
    knex('users')
      .where({ username: username })
      .select('username', 'password')
      .then(foundUsers => {
        if (!foundUsers[0]) {
          return done(null, false);
        } else if (password !== foundUsers[0].password) {
          return done(null, false);
        } else {
          return done(null, foundUsers[0]);
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);
