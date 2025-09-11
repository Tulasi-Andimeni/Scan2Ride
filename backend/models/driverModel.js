// const mongoose = require('mongoose');

// const driverSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
//   busNumber: {
//     type: String,
//     required: true,
//   },
//   experienceYears: {
//     type: Number,
//     default: 0,
//   },
//   assignedRoute: {
//     type: String,
//   },
//   image: {
//     type: String, // Store image URL or base64 string
//     default: "",  // You can also set a default profile image URL
//   }
//     deleted: {
//     type: Boolean,
//     default: false,  // NEW FIELD: marks whether the driver is soft-deleted
//   }
// });

// module.exports = mongoose.model('Driver', driverSchema);



const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  busNumber: { type: String, required: true },
  experienceYears: { type: Number, default: 0 },
  assignedRoute: { type: String },
  image: { type: String },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
