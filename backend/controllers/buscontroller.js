// const Student = require("../models/studentModel");
// const Driver = require("../models/driverModel");

// exports.getBusDetails = async (req, res) => {
//   try {
//     const busNumber = req.params.id;

//     const students = await Student.find({ busNumber });
//     const driver = await Driver.findOne({ busNumber });

//     if (!students.length) {
//       return res.status(404).json({ message: "Ee bus number tho students leru ra!" });
//     }

//     res.json({
//       busNumber,
//       driver: driver?.name || "Driver not available",
//       driverPhone: driver?.phoneNumber || "---",
//       students,
//     });
//   } catch (err) {
//     console.error("Bus details fetch error:", err);
//     res.status(500).json({ message: "Server error ra: " + err.message });
//   }
// };













// // controllers/busController.js
// const Student = require("../models/studentModel");
// const Driver = require("../models/driverModel");

// exports.getBusDetails = async (req, res) => {
//   try {
//     const busNumber = req.params.id;

//     const students = await Student.find({ busNumber });
//     const driver = await Driver.findOne({ busNumber });

//     if (!students.length) {
//       return res.status(404).json({ message: "Ee bus number tho students leru ra!" });
//     }

//     res.json({
//       busNumber,
//       driver: driver?.name || "Driver not available",
//       driverPhone: driver?.phoneNumber || "---",
//       driverImage: driver?.image || "", // ✅ Make sure this is added
//       students,
//     });
//   } catch (err) {
//     console.error("Bus details fetch error:", err);
//     res.status(500).json({ message: "Server error ra: " + err.message });
//   }
// };













const Student = require("../models/studentModel");
const Driver = require("../models/driverModel");
const Attendance = require("../models/attendance");

exports.getBusDetails = async (req, res) => {
  try {
    const busNumber = req.params.id;

    // 🗓️ Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // ✅ Get today's attendance for this bus
    const todayAttendance = await Attendance.find({
      busNumber,
      checkInTime: { $gte: today, $lt: tomorrow },
    }).populate("studentId"); // assuming 'studentId' is ref in Attendance

    const students = todayAttendance.map((record) => {
      return {
        _id: record._id,
        studentid: record.studentId.studentid,
        name: record.studentId.name,
        branch: record.studentId.branch,
        busNumber: record.busNumber,
        checkIn: !!record.checkInTime,
        checkOut: !!record.checkOutTime,
        checkInTime: record.checkInTime,
        checkOutTime: record.checkOutTime,
      };
    });

    const driver = await Driver.findOne({ busNumber });

    res.json({
      busNumber,
      driver: driver?.name || "Driver not available",
      driverPhone: driver?.phoneNumber || "---",
      driverImage: driver?.image || "",
      students,
    });
  } catch (err) {
    console.error("Bus details fetch error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
