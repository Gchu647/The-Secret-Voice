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

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
