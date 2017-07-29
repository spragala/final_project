var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Signup
router.get('/signup', function (req, res) {
  res.render('signup');
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
      errors: errors,
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      admin: false,
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
    });

    req.flash('success_msg', 'You have successfully created an account, please login.');

    res.redirect('/users/login');
  }
}); // <- router.post

// Passport Strategy
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'Unknown User',
        });
      }

      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Invalid password',
          });
        }
      });
    });
  }));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

// Login
router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/users/login',
    failureFlash: true,
  }),
  function (req, res) {
    res.redirect('/');
  });

// Logout
router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success_msg', 'You have successfully logged out');

  res.redirect('/');
});

// Admin User - profile pages
router.get('/:id', checkAuth, function (req, res) {
  User.findById(req.params.id)
  .populate('appointments')
  .exec(function (err, user) {
    if (req.user.admin === true) {
      res.render('profile', {
        username: user.username,
        name: user.name,
        email: user.email,
        id: user.id,
        appointments: user.appointments,
        links: user.links,
      });
    } else {
      req.flash('error_msg', 'You are not authorized');
      res.redirect('/');
    }
  });
});

// Update User info
router.post('/:id', checkAuth, function (req, res) {
  var objForUpdate = {};

  if (req.body.username) objForUpdate.username = req.body.username;
  if (req.body.email) objForUpdate.email = req.body.email;
  User.update({ _id: req.params.id }, objForUpdate, function (err) {
    if (err) throw err;
    res.redirect('/profile');
  });
});

// Add a link
router.post('/:id/links', checkAuth, function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) throw err;
    user.links.push(req.body.links);
    user.save();
    res.status(201).json(user);
  });
});

//  delete a link
router.post('/:id/links/:index', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) throw err;
    console.log(req.params.index)
    user.links.splice(req.params.index, 1);
    user.save();
  });
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

module.exports = router;
