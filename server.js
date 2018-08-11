const express = require('express');
const bp = require('body-parser');
const app = express();

app.use(bp);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`
  **Kick Ass** Server Listening on Port ${PORT}`);
});
