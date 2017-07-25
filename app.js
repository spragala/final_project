/************
* SERVER    *
************/

var express = require('express');
var path = require('path');

// Initialize App
var app = express();

//var admin = express(); TODO - create Admin pg

// Set Port
app.listen(process.env.PORT || 3000, function () {
  console.log('Server started on port: http://localhost:3000/');
});

/************
* DATABASE  *
************/

var db = require("./models"); // index.js

/************
* MIDDLEWARE *
************/

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator - from: https://github.com/ctavan/express-validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

/************
* ROUTES    *
************/

var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

/************
* VIEWS    *
************/

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
