var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', checkAuthentication, function (req, res) {
  res.render('index');
});

function checkAuthentication(res, req, next) {
  console.log(req);
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('users/login');
  }
}

module.exports = router;
