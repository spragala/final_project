var express = require('express');
var router = express.Router();

// Get Welcomepage
router.get('/', function (req, res) {
  res.render('index');
});

// Get Homepage
router.get('/profile', checkAuth, function (req, res) {
  res.render('profile', {
    username: req.user.username,
    name: req.user.name
  });
});

// Admin Dashboard
router.get('/dashboard', checkAdmin, function (req, res) {
  res.render('dashboard');
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

function checkAdmin(req, res, next) {
  if (req.isAuthenticated() && req.admin === true) {
    return next();
  } else {
    req.flash('error_msg', 'You are not authorized');
    res.redirect('/');
  }
}

module.exports = router;
