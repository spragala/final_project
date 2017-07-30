var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId, ref: 'User', required: true,
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
  time: {
    type: Date,
  },
  notes: {
    type: String,
  },
});

var Appointment = module.exports = mongoose.model('Appointment', AppointmentSchema);
