// const mongoose = require("mongoose");

// const attendanceSchema = new mongoose.Schema({
//   studentid: String,
//   name: String,
//   branch: String,
//   busNumber: String,
//   checkInTime: Date,
//   checkOutTime: Date,
//   date: String, // 'YYYY-MM-DD'
// });

// module.exports = mongoose.model("Attendance", attendanceSchema);







// models/attendance.js
// const mongoose = require("mongoose");

// const attendanceSchema = new mongoose.Schema({
//   studentid: { type: String, required: true }, // Link to student ID
//   name: { type: String, required: true },
//   branch: { type: String, required: true },
//   busNumber: { type: String, required: true },
//   checkInTime: { type: Date, default: null }, // Nullable for when only checkout exists, though current logic implies check-in first
//   checkOutTime: { type: Date, default: null },
//   date: { type: String, required: true }, // Format: YYYY-MM-DD for easy querying
// });

// // Optional: Add an index for faster queries on studentid and date
// attendanceSchema.index({ studentid: 1, date: 1 }, { unique: true });

// module.exports = mongoose.model("Attendance", attendanceSchema);











const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  // studentid: { type: String, required: true },
  studentid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Student",
},
  name: { type: String, required: true },
  branch: { type: String, required: true },
  busNumber: { type: String, required: true },
  checkInTime: { type: Date, default: null },
  checkOutTime: { type: Date, default: null },
  date: { type: String, required: true } // Format: YYYY-MM-DD
}, {
  timestamps: true
});

// Ensure one attendance record per student per date
attendanceSchema.index({ studentid: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
