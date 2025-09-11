// const Student = require("../models/studentModel");
// const Attendance = require("../models/attendance");

// exports.handleScan = async (req, res) => {
//   const { studentid } = req.body;
//   const today = new Date().toISOString().split("T")[0];
//   console.log(req.body.studentid);

//   try {
//     const student = await Student.findOne({ studentid });
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     let attendance = await Attendance.findOne({ studentid, date: today });

//     let status = "Check-in";
//     if (attendance) {
//       if (!attendance.checkOutTime) {
//         attendance.checkOutTime = new Date();
//         status = "Check-out";
//         await attendance.save();
//       } else {
//         return res.json({ message: "Already checked out", status: "Done", student });
//       }
//     } else {
//       attendance = new Attendance({
//         studentid,
//         name: student.name,
//         branch: student.branch,
//         busNumber: student.busNumber,
//         checkInTime: new Date(),
//         date: today,
//       });
//       await attendance.save();
//     }

//     res.json({ status, student, time: new Date() });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };












// // controllers/scanController.js
// const Student = require("../models/studentModel");
// const Attendance = require("../models/attendance");

// exports.handleScan = async (req, res) => {
//   // Ensure req.body exists and has the studentid property
//   // The TypeError indicates req.body might be undefined or missing studentid
//   const { studentid } = req.body;
//   const io = req.app.get("io"); // Get the Socket.IO instance

//   // Basic validation
//   if (!studentid) {
//     return res.status(400).json({ message: "Student ID is required." });
//   }

//   const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

//   try {
//     const student = await Student.findOne({ studentid });
//     if (!student) {
//       // Emit an event for student not found
//       io.emit("scan-error", { studentid, message: "Student not found" });
//       return res.status(404).json({ message: "Student not found" });
//     }

//     let attendance = await Attendance.findOne({ studentid, date: today });
//     let status = "Check-in";
//     let message = "";

//     if (attendance) {
//       if (!attendance.checkOutTime) {
//         // If checkInTime exists but checkOutTime does not, it's a check-out
//         attendance.checkOutTime = new Date();
//         status = "Check-out";
//         message = "Checked out successfully.";
//         await attendance.save();
//       } else {
//         // Already checked out
//         message = "Already checked out for today.";
//         status = "Already Checked Out"; // More descriptive status
//         // Still return the student details and current status
//         return res.json({ message, status, student, time: attendance.checkOutTime.toLocaleTimeString() });
//       }
//     } else {
//       // First scan of the day, it's a check-in
//       attendance = new Attendance({
//         studentid,
//         name: student.name,
//         branch: student.branch,
//         busNumber: student.busNumber,
//         checkInTime: new Date(),
//         date: today,
//       });
//       status = "Check-in";
//       message = "Checked in successfully.";
//       await attendance.save();
//     }

//     // Prepare data to send to the client (real-time update)
//     const liveData = {
//       status,
//       message,
//       student: {
//         name: student.name,
//         studentid: student.studentid,
//         branch: student.branch,
//         busNumber: student.busNumber,
//       },
//       time: new Date().toLocaleTimeString(), // Current scan time
//       checkInTime: attendance.checkInTime ? attendance.checkInTime.toLocaleTimeString() : null,
//       checkOutTime: attendance.checkOutTime ? attendance.checkOutTime.toLocaleTimeString() : null,
//     };

//     // Emit socket event for real-time update
//     io.emit("attendance-updated", liveData); // Event name can be anything you define

//     // Send response to the client making the HTTP request
//     res.json(liveData);

//   } catch (err) {
//     console.error("Scan error:", err);
//     // Emit an error event if something goes wrong
//     io.emit("scan-error", { studentid, message: "Server error during scan process." });
//     res.status(500).json({ message: "Server error during scan process." });
//   }
// };


const Student = require("../models/studentModel");
const Attendance = require("../models/attendance");

exports.handleScan = async (req, res) => {
  const { studentid } = req.body;
  const io = req.app.get("io");

  // Basic validation
  if (!studentid) {
    return res.status(400).json({ message: "Student ID is required." });
  }

  const trimmedId = studentid.trim();
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  try {
    // Case-insensitive exact match for studentid
    const student = await Student.findOne({
      studentid: { $regex: `^${trimmedId}$`, $options: "i" },
    });

    if (!student) {
      io.emit("scan-error", { studentid, message: "Student not found" });
      return res.status(404).json({ message: "Student not found" });
    }

    let attendance = await Attendance.findOne({ studentid: student.studentid, date: today });
    let status = "Check-in";
    let message = "";

    if (attendance) {
      if (!attendance.checkOutTime) {
        attendance.checkOutTime = new Date();
        status = "Check-out";
        message = "Checked out successfully.";
        await attendance.save();
      } else {
        message = "Already checked out for today.";
        status = "Already Checked Out";
        return res.json({
          message,
          status,
          student,
          time: attendance.checkOutTime.toLocaleTimeString(),
        });
      }
    } else {
      attendance = new Attendance({
        studentid: student.studentid,
        name: student.name,
        branch: student.branch,
        busNumber: student.busNumber,
        checkInTime: new Date(),
        date: today,
      });
      await attendance.save();
      status = "Check-in";
      message = "Checked in successfully.";
    }

    const liveData = {
      status,
      message,
      student: {
        name: student.name,
        studentid: student.studentid,
        branch: student.branch,
        busNumber: student.busNumber,
      },
      time: new Date().toLocaleTimeString(),
      checkInTime: attendance.checkInTime?.toLocaleTimeString() || null,
      checkOutTime: attendance.checkOutTime?.toLocaleTimeString() || null,
    };

    io.emit("attendance-updated", liveData);
    res.json(liveData);
  } catch (err) {
    console.error("Scan error:", err);
    io.emit("scan-error", { studentid, message: "Server error during scan process." });
    res.status(500).json({ message: "Server error during scan process." });
  }
};
