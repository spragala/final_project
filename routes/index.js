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
  User.findOne({ _id: req.user._id })
  .populate('appointments')
  .exec(function (err, user) {
    // need function to reformat user.appointments.time
    if (err) throw err;
    res.render('profile', {
      username: user.username,
      name: user.name,
      email: user.email,
      id: user._id,
      appointments: user.appointments,
      links: user.links,
    });
  });
});

// Get new appointment
// router.get('/new_appointment', function (req, res) {
//   res.render('new_appointment');
// });

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
    time: time,
  });

  newAppointment.save(function (err, appointment) {
    if (err) throw err;
    res.redirect('/dashboard');
  });
});

// Update Appointment
router.post('/appointments/:id', function (req, res) {
  var hour = req.body.hour;
  var date = req.body.date;

  var newHour = hour.slice(0, 5) + ' ' + hour.slice(5, 7);
  var time = date + ' ' + newHour;

  Appointment.update({ _id: req.params.id }, {
      title: req.body.title,
      location: req.body.location,
      notes: req.body.notes,
      time: time,
    }, function (err) {
    if (err) throw err;
    res.redirect('/dashboard');
  });
});

router.delete('/appointments/:id', function (req, res) {
  Appointment.findById(req.params.id, function (err, appointment) {
    if (err) throw err;
    appointment.remove(function (err) {
      if (err) throw err;
      res.redirect('/dashboard');
    });
  });
});

DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Admin Dashboard
router.get('/dashboard', checkAuth, function (req, res) {
  if (req.user.admin === true) {
    User.find({}).populate('appointments').exec(function (err, allUsers) {
      if (err) throw err;

      // hattip to michelle
      clients = allUsers.map(function (user) {
        user.times = user.appointments.map(function (x) { // adding 'times' to users to change Date into String
          newTime = `${DAYS[x.time.getDay()]} at ${x.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
          return { title: x.title, location: x.location, time: newTime, id: x._id };
        }
      );
        return user;
      }
    );
      res.render('dashboard', {
        users: clients,
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
