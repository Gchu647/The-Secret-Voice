const express = require('express');
const bp = require('body-parser');
const knex = require('./knex/knex.js');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`
  **Kick Ass** Server Listening on Port ${PORT}`);
});
