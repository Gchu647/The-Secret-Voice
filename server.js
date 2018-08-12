const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bp = require('body-parser');
const hbs = require('hbs');
const app = express();

const knex = require('./knex/knex.js');
const PassportStrategy = require('./passport');

const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 8080;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_KEY || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('*');

app.listen(PORT, () => {
  console.log(`
  **Kick Ass** Server Listening on Port ${PORT}`);
});
