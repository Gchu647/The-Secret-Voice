const passport = require('passport');
const knex = require('./knex/knex');
const Strategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});

passport.use(
  new Strategy(function(username, password, done) {
    done(null, { username, password });
    // knex('users')
    //   .where({ username: username })
    //   .select('username', 'password')
    //   .then(foundUsers => {
    //     done(null, foundUsers[0]);
    //   });
  })
);
