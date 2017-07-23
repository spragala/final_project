/************
* SERVER    *
************/

var express = require('express');
var path = require('path');

// Initialize App
var app = express();

//var admin = express(); TODO - create Admin pg

/************
* DATABASE  *
************/

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/wdi_final_project');

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

/************
* ROUTES    *
************/

var routes = require('./routes/index');
var users = require('./routes/users');
