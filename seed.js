var db = require("./models"); // index.js


db.User
    .findOne({_id: "597579f858e71e4777ec0bf2"})
    .populate("appointments")
    .exec((err,user) => {
      err && console.log(err);
      console.log("user:", user);
      console.log("user.appointments:", user.appointments);
      process.exit();
    });


// db.Appointment
//     .find({_user: "597579f858e71e4777ec0bf2"})
//     .exec((err, appointments) => {
//       err && console.log(err);
//       console.log("appointments:", appointments);
//     })

// var appointments_list = [
//   {
//     _creator: '597579f858e71e4777ec0bf2',
//     title: 'test',
//     location: 'office',
//     time: Date.now
//   }
// ]
