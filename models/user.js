var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var Appointment = require('../models/appointment');

var UserSchema = new Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  admin: {
    type: Boolean
  }
});

UserSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",    // find appointments where user._id ===
  foreignField: "_user" // appointment._user
})

var User = module.exports = mongoose.model('User', UserSchema);

// taken from: https://github.com/bradtraversy/

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function (username, callback) {
  var query = {
    username: username
  };
  User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};
