var express = require('express');
var router = express.Router();

// Signup
router.get('/signup', function (req, res) {
  res.render('signup');
});

// Login
router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  console.log(name)
});

module.exports = router;
