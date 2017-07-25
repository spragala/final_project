var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/wdi_final_project');

module.exports.User = require("./user")
module.exports.Appointment = require("./appointment")
