var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Appointment = require('../models/appointment');

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

// Get new appointment
router.get('/new_appointment', function (req, res) {
  res.render('new_appointment');
});

// Create an appointment for a User
router.post('/new_appointment', function (req, res) {
  var title = req.body.title;
  var location = req.body.location;
  var notes = req.body.notes;
  var _user = req.body._user;
  var time = req.body.date;
  var apptData = {
    _user: _user,
    title: title,
    location: location,
    notes: notes,
    time: time
  };
  console.log(apptData); 
  var newAppointment = new Appointment(apptData);
  console.log(newAppointment)
  newAppointment.save(function (err, appointment) {
    if (err) throw err;
    res.json(appointment);
  });
});

// Admin Dashboard
router.get('/dashboard', checkAuth, function (req, res) {
  if (req.user.admin === true) {
    User.find({}).populate('appointments').exec(function (err, allUsers) {
      if (err) throw err;
      res.render('dashboard', {
        users: allUsers
      });
    });
  } else {
    req.flash('error_msg', 'You are not authorized');
    res.redirect('/');
  }

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
