const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.send('hello there from auth route');
});

module.exports = router;
