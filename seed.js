var db = require('./models'); // index.js
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var clientList = [
{
  name: 'Jon Snow',
  username: "r'hllor",
  email: 'kingonorth@gmail.com',
  password: '1234',
  admin: false,
  links: [],
},
{
  name: 'Daenerys Targaryen',
  username: 'dany',
  email: 'dragonlady@gmail.com',
  password: '1234',
  admin: false,
  links: [],
},
{
  name: 'Tyrion Lannister',
  username: 'littleguy',
  email: 'biglilguy@gmail.com',
  password: '1234',
  admin: false,
  links: [],
},
{
  name: 'Bran Stark',
  username: 'rav3n',
  email: 'thirdeyeblind@gmail.com',
  password: '1234',
  admin: false,
  links: [],
},
{
  name: 'Catherine Sprague',
  username: 'Katie',
  email: 'SpragueTherapy@gmail.com',
  password: '1234',
  admin: true,
  links: [],
},
];

db.User.remove({}, function (err, users) {
  console.log('Deleted all Users. Sadness.');
  clientList.forEach(function (userData) {
    var client = new db.User({
      username: userData.username,
      password: userData.password,
      email: userData.email,
      name: userData.name,
      admin: userData.admin,
      links: userData.admin,
    });
    User.createUser(client, function (err, user) {
      if (err) throw err;
      console.log('Saved' + user.name);
    });
  });
});
