var express = require('express');
var router = express.Router();
var User = require('../models/user');

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

  // Validations
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email address is required').notEmpty();
  req.checkBody('email', 'Email address is not vaild').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'A password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    res.render('signup', {
      errors: errors
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      console.log(user)
    });

    req.flash('success_msg', 'You have successfully created an account, please login.');

    res.redirect('/users/login')
  }
}); // <- router.post

module.exports = router;
