'use strict';

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const bp = require('body-parser');
const expressHandlebars = require('express-handlebars');
const knex = require('./db/knex');
const app = express();

const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/song');

const PORT = process.env.PORT || 8080;

app.engine('.hbs', expressHandlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.static('./public'));
app.use(fileUpload());
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
app.use('/song', songRoutes);

app.get('/', (req, res) => {
  knex.raw(
    `SELECT *
    FROM contents c
    INNER JOIN users u ON c.user_id = u.id`
  )
  .then(songs => {
    console.log(songs.rows);
    res.render('index', { songs: songs.rows })
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

app.get('*');

app.listen(PORT, () => {
  console.log(`
  **Kick Ass** Server Listening on Port ${PORT}`);
});
