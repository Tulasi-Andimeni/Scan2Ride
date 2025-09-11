// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   studentid: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   branch: {
//     type: String,
//     required: true,
//   },
//   busNumber: {
//     type: String,
//     required: true,
//   },
//    location: {
//     type: String,
//     required: true,
//   },
//   checkInTime: Date,
//   checkOutTime: Date,    
//   lastScannedDate: String, 
//   status: {
//     type: String,
//     enum: ['none', 'checkin', 'checkout'],
//     default: 'none',
//   }
// }, {
//   timestamps: true,
// });

// module.exports = mongoose.model('Student', studentSchema);






// models/studentModel.js


// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   studentid: { type: String, required: true, unique: true, trim: true, uppercase: true }, // Ensure uniqueness and consistent format
//   branch: { type: String, required: true, trim: true },
//   busNumber: { type: String, required: true, trim: true },
//   location: { type: String, required: true, trim: true }, // e.g., 'Pickup', 'Dropoff'
//   // Removed checkInTime, checkOutTime, lastScannedDate, status from studentModel
//   // as these are handled in attendance.js for daily records.
//   // Student model should represent static student data.
// }, {
//   timestamps: true, // Adds createdAt and updatedAt timestamps automatically
// });

// module.exports = mongoose.model('Student', studentSchema);

// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentid: String,
  name: String,
  busNumber: String,
  location: String,
  branch: String,
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Student', studentSchema);




// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     studentid: {
//         type: String,
//         required: true,
//         unique: true, // Ensure studentid is unique
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     busNumber: {
//         type: String,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     branch: {
//         type: String,
//         required: true,
//     },
//     deleted: {
//         type: Boolean,
//         default: false,
//     },
// }, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// module.exports = mongoose.model('Student', studentSchema);
