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
  User.findOne({})
  .populate('appointments')
  .exec(function (err, user) {
    res.render('profile', {
      username: req.user.username,
      name: req.user.name,
      appointments: req.user.appointments
    });
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
  var hour = req.body.hour;
  var date = req.body.date;

  var newHour = hour.slice(0, 5) + ' ' + hour.slice(5, 7);
  var time = date + ' ' + newHour;

  var newAppointment = new Appointment({
    _user: _user,
    title: title,
    location: location,
    notes: notes,
    time: time
  });
  console.log(newAppointment);
  newAppointment.save(function (err, appointment) {
    if (err) throw err;
    res.redirect('/dashboard');
  });
});

DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// Admin Dashboard
router.get('/dashboard', checkAuth, function (req, res) {
  if (req.user.admin === true) {
    User.find({}).populate('appointments').exec(function (err, allUsers) {
      if (err) throw err;
      console.log(allUsers);
      people = allUsers.map(function (user) {
        console.log(user.appointments);
        user.times = user.appointments.map(function (x) {
          newTime = `${DAYS[x.time.getDay()]} at ${x.time.toTimeString()}`;
          return {title: x.title, location: x.location, time: newTime};
        }
      );
        console.log(user.times);
        return user;
      }
    );
      console.log(people);
      res.render('dashboard', {
        users: people,
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
