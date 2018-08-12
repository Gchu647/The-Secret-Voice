'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const server = express();

const PORT = process.env.PORT || 8080;

// -------------------------------------------------- //

server.use(express.static('./public'));
server.use(bodyParser.urlencoded({ extended: true }));

server.engine('.hbs', expressHandlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}));

server.set('view engine', '.hbs');

// -------------------------------------------------- //

server.get('/', (req, res) => {
  res.render('index');
});

server.get('/songs/:id', (req, res) => {
  res.render('songs/song');
});

server.get('/login', (req, res) => {
  res.render('auth/login');
});

server.get('/register', (req, res) => {
  res.render('auth/register');
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
