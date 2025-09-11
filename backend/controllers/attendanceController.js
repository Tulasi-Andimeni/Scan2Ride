// // controllers/attendanceController.js
// const Attendance = require("../models/attendance");

// exports.getTodayAttendance = async (req, res) => {
//   const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
//   try {
//     const data = await Attendance.find({ date: today }).sort({ checkInTime: -1 }); // Sort by check-in time descending
//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching today's attendance:", err);
//     res.status(500).json({ message: "Error fetching attendance" });
//   }
// };

// // Optional: Get attendance for a specific date (if needed)
// exports.getAttendanceByDate = async (req, res) => {
//   const { date } = req.params; // Expects date in YYYY-MM-DD format
//   if (!date) {
//     return res.status(400).json({ message: "Date parameter is required." });
//   }
//   try {
//     const data = await Attendance.find({ date: date }).sort({ checkInTime: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error(`Error fetching attendance for ${date}:`, err);
//     res.status(500).json({ message: `Error fetching attendance for ${date}` });
//   }
// };

// // Optional: Get attendance for a specific student (if needed)
// exports.getStudentAttendanceHistory = async (req, res) => {
//     const { studentid } = req.params;
//     if (!studentid) {
//         return res.status(400).json({ message: "Student ID parameter is required." });
//     }
//     try {
//         const data = await Attendance.find({ studentid: studentid }).sort({ date: -1, checkInTime: -1 });
//         res.json(data);
//     } catch (err) {
//         console.error(`Error fetching attendance history for student ${studentid}:`, err);
//         res.status(500).json({ message: `Error fetching attendance history for student ${studentid}` });
//     }
// };

























// const Attendance = require("../models/attendance");
// const moment = require("moment");

// exports.getTodayAttendance = async (req, res) => {
//   const today = new Date().toISOString().split("T")[0];
//   try {
//     const data = await Attendance.find({ date: today }).sort({ checkInTime: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching today's attendance:", err);
//     res.status(500).json({ message: "Error fetching attendance" });
//   }
// };

// exports.getAttendanceByDate = async (req, res) => {
//   const { date } = req.params;
//   if (!date) return res.status(400).json({ message: "Date parameter is required." });
//   try {
//     const data = await Attendance.find({ date }).sort({ checkInTime: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error(`Error fetching attendance for ${date}:`, err);
//     res.status(500).json({ message: `Error fetching attendance for ${date}` });
//   }
// };

// exports.getStudentAttendanceHistory = async (req, res) => {
//   const { studentid } = req.params;
//   if (!studentid) return res.status(400).json({ message: "Student ID parameter is required." });
//   try {
//     const data = await Attendance.find({ studentid }).sort({ date: -1, checkInTime: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error(`Error fetching attendance history for ${studentid}:`, err);
//     res.status(500).json({ message: `Error fetching attendance history for ${studentid}` });
//   }
// };
// exports.getBusWiseAttendance = async (req, res) => {
//   try {
//     const result = await Attendance.aggregate([
//       {
//         $match: {
//           checkInTime: { $ne: null }, // only count those who checked in
//         },
//       },
//       {
//         $group: {
//           _id: "$busNumber",
//           studentCount: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { _id: 1 },
//       },
//     ]);

//     res.json(result);
//   } catch (err) {
//     console.error("Error in getBusWiseAttendance:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.getAttendanceSummary = async (req, res) => {
//   try {
//     const today = new Date().toISOString().split("T")[0];

//     const summary = await Attendance.aggregate([
//       { $match: { date: today } },
//       {
//         $group: {
//           _id: "$busNumber",
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           busNumber: "$_id",
//           count: 1,
//           _id: 0
//         }
//       }
//     ]);

//     res.json(summary);
//   } catch (err) {
//     console.error("❌ Error fetching summary:", err);
//     res.status(500).json({ message: "Server error fetching summary" });
//   }
// };



// exports.getBusPieData = async (req, res) => {
//   try {
//     const busNumber = req.params.id;
//     const today = new Date().toISOString().split("T")[0];

//     const count = await Attendance.countDocuments({
//       busNumber,
//       date: today,
//       checkInTime: { $ne: null },
//     });

//     let data = [];

//     if (count <= 14) {
//       data = [
//         { name: "Available", value: count },
//         { name: "Required", value: 0 },
//         { name: "Overloaded", value: 0 },
//       ];
//     } else if (count <= 19) {
//       data = [
//         { name: "Available", value: 0 },
//         { name: "Required", value: count },
//         { name: "Overloaded", value: 0 },
//       ];
//     } else {
//       data = [
//         { name: "Available", value: 0 },
//         { name: "Required", value: 0 },
//         { name: "Overloaded", value: count },
//       ];
//     }

//     res.json(data);
//   } catch (err) {
//     console.error("Error in getBusPieData:", err);
//     res.status(500).json({ message: "Error fetching pie data" });
//   }
// };


















// const Attendance = require("../models/attendance");
// const moment = require("moment");
// const Driver = require("../models/driverModel");

// // ✅ 1. Get today's live attendance (used in LiveAttendance page)
// exports.getTodayAttendance = async (req, res) => {
//   const today = new Date().toISOString().split("T")[0];
//   try {
//     const data = await Attendance.find({ date: today }).sort({ checkInTime: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching today's attendance:", err);
//     res.status(500).json({ message: "Error fetching attendance" });
//   }
// };

// // ✅ 2. Get attendance for a specific date (used in filters/history)
// exports.getAttendanceByDate = async (req, res) => {
//   const { date } = req.params;
//   if (!date) return res.status(400).json({ message: "Date parameter is required." });

//   try {
//     const data = await Attendance.find({ date }).sort({ checkInTime: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error(`Error fetching attendance for ${date}:`, err);
//     res.status(500).json({ message: `Error fetching attendance for ${date}` });
//   }
// };

// // ✅ 3. Get full attendance history of a student
// exports.getStudentAttendanceHistory = async (req, res) => {
//   const { studentid } = req.params;
//   if (!studentid) return res.status(400).json({ message: "Student ID parameter is required." });

//   try {
//     const data = await Attendance.find({ studentid }).sort({ date: -1, checkInTime: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error(`Error fetching attendance history for ${studentid}:`, err);
//     res.status(500).json({ message: `Error fetching attendance history for ${studentid}` });
//   }
// };

// // ✅ 4. Get bus-wise student count (used in bar chart / analytics)
// exports.getBusWiseAttendance = async (req, res) => {
//   try {
//     const result = await Attendance.aggregate([
//       {
//         $match: {
//           checkInTime: { $ne: null }, // only count those who checked in
//         },
//       },
//       {
//         $group: {
//           _id: "$busNumber",
//           studentCount: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { _id: 1 },
//       },
//     ]);

//     res.json(result);
//   } catch (err) {
//     console.error("Error in getBusWiseAttendance:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ✅ 5. Get today's attendance summary per bus (used in dashboard overview)
// exports.getAttendanceSummary = async (req, res) => {
//   try {
//     const today = new Date().toISOString().split("T")[0];

//     const summary = await Attendance.aggregate([
//       { $match: { date: today } },
//       {
//         $group: {
//           _id: "$busNumber",
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           busNumber: "$_id",
//           count: 1,
//           _id: 0
//         }
//       }
//     ]);

//     res.json(summary);
//   } catch (err) {
//     console.error("❌ Error fetching summary:", err);
//     res.status(500).json({ message: "Server error fetching summary" });
//   }
// };

// // ✅ 6. Get pie chart data for a particular bus
// exports.getBusPieData = async (req, res) => {
//   try {
//     const busNumber = req.params.id;
//     const today = new Date().toISOString().split("T")[0];

//     const count = await Attendance.countDocuments({
//       busNumber,
//       date: today,
//       checkInTime: { $ne: null },
//     });

//     let data = [];

//     if (count <= 14) {
//       data = [
//         { name: "Available", value: count },
//         { name: "Required", value: 0 },
//         { name: "Overloaded", value: 0 },
//       ];
//     } else if (count <= 19) {
//       data = [
//         { name: "Available", value: 0 },
//         { name: "Required", value: count },
//         { name: "Overloaded", value: 0 },
//       ];
//     } else {
//       data = [
//         { name: "Available", value: 0 },
//         { name: "Required", value: 0 },
//         { name: "Overloaded", value: count },
//       ];
//     }

//     res.json(data);
//   } catch (err) {
//     console.error("Error in getBusPieData:", err);
//     res.status(500).json({ message: "Error fetching pie data" });
//   }
// };



// exports.getBusTodayData = async (req, res) => {
//   try {
//     const busNumber = req.params.id;

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const attendanceRecords = await Attendance.find({
//       busNumber,
//       checkInTime: { $gte: today, $lt: tomorrow },
//     }).sort({ checkInTime: -1 });

//     const students = attendanceRecords.map((record) => ({
//       _id: record._id,
//       studentid: record.studentid,
//       name: record.name,
//       branch: record.branch,
//       busNumber: record.busNumber,
//       checkIn: !!record.checkInTime,
//       checkOut: !!record.checkOutTime,
//       checkInTime: record.checkInTime,
//       checkOutTime: record.checkOutTime,
//     }));

//     const driver = await Driver.findOne({ busNumber });

//     res.json({
//       busNumber,
//       driver: driver?.name || "Driver not available",
//       driverPhone: driver?.phoneNumber || "---",
//       driverImage: driver?.image || "",
//       students,
//     });
//   } catch (err) {
//     console.error("❌ Error fetching bus data:", err);
//     res.status(500).json({ message: "Server error while fetching bus data" });
//   }
// };





const Attendance = require("../models/attendance");
const Student = require("../models/studentModel");
const Driver = require("../models/driverModel");

// 1️⃣ Get today's live attendance
exports.getTodayAttendance = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  try {
    const data = await Attendance.find({ date: today }).sort({ checkInTime: -1 });
    res.json(data);
  } catch (err) {
    console.error("Error fetching today's attendance:", err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

// 2️⃣ Get attendance for a specific date
exports.getAttendanceByDate = async (req, res) => {
  const { date } = req.params;
  if (!date) return res.status(400).json({ message: "Date parameter is required." });

  try {
    const data = await Attendance.find({ date }).sort({ checkInTime: -1 });
    res.json(data);
  } catch (err) {
    console.error(`Error fetching attendance for ${date}:`, err);
    res.status(500).json({ message: `Error fetching attendance for ${date}` });
  }
};

// 3️⃣ Get full attendance history for one student
exports.getStudentAttendanceHistory = async (req, res) => {
  const { studentid } = req.params;
  if (!studentid) return res.status(400).json({ message: "Student ID parameter is required." });

  try {
    const data = await Attendance.find({ studentid }).sort({ date: -1, checkInTime: -1 });
    res.json(data);
  } catch (err) {
    console.error(`Error fetching attendance history for ${studentid}:`, err);
    res.status(500).json({ message: `Error fetching attendance history for ${studentid}` });
  }
};

// 4️⃣ Get bus-wise student count (for bar chart)
exports.getBusWiseAttendance = async (req, res) => {
  try {
    const result = await Attendance.aggregate([
      { $match: { checkInTime: { $ne: null } } },
      { $group: { _id: "$busNumber", studentCount: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(result);
  } catch (err) {
    console.error("Error in getBusWiseAttendance:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 5️⃣ Attendance summary for dashboard
exports.getAttendanceSummary = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const summary = await Attendance.aggregate([
      { $match: { date: today } },
      {
        $group: {
          _id: "$busNumber",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          busNumber: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json(summary);
  } catch (err) {
    console.error("❌ Error fetching summary:", err);
    res.status(500).json({ message: "Server error fetching summary" });
  }
};

// 6️⃣ Pie chart data per bus
exports.getBusPieData = async (req, res) => {
  try {
    const busNumber = req.params.id;
    const today = new Date().toISOString().split("T")[0];

    const count = await Attendance.countDocuments({
      busNumber,
      date: today,
      checkInTime: { $ne: null },
    });

    let data = [];

    if (count <= 14) {
      data = [
        { name: "Available", value: count },
        { name: "Required", value: 0 },
        { name: "Overloaded", value: 0 },
      ];
    } else if (count <= 19) {
      data = [
        { name: "Available", value: 0 },
        { name: "Required", value: count },
        { name: "Overloaded", value: 0 },
      ];
    } else {
      data = [
        { name: "Available", value: 0 },
        { name: "Required", value: 0 },
        { name: "Overloaded", value: count },
      ];
    }

    res.json(data);
  } catch (err) {
    console.error("Error in getBusPieData:", err);
    res.status(500).json({ message: "Error fetching pie data" });
  }
};

// 7️⃣ Get today's students for a bus (used in Businfo.jsx)
exports.getBusTodayData = async (req, res) => {
  try {
    const busNumber = req.params.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const attendanceRecords = await Attendance.find({
      busNumber,
      checkInTime: { $gte: today, $lt: tomorrow },
    })
      .sort({ checkInTime: -1 })
      .populate("studentid");

    const students = attendanceRecords
      .map((record) => {
        if (!record.studentId) return null;
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
      })
      .filter(Boolean);

    const driver = await Driver.findOne({ busNumber });

    res.json({
      busNumber,
      driver: driver?.name || "Driver not available",
      driverPhone: driver?.phoneNumber || "---",
      driverImage: driver?.image || "",
      students,
    });
  } catch (err) {
    console.error("❌ Error fetching bus data:", err);
    res.status(500).json({ message: "Server error while fetching bus data" });
  }
};



// const Attendance = require("../models/attendance");
// const Student = require("../models/studentModel");

exports.scanStudent = async (req, res) => {
  const { studentid } = req.body;

  if (!studentid) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const student = await Student.findOne({ studentid });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const today = new Date().toISOString().split("T")[0];

    // Try to find if attendance already exists for today
    let attendance = await Attendance.findOne({
      studentid: student._id,
      date: today,
    });

    const currentTime = new Date();

    if (!attendance) {
      // First scan – mark check-in
      attendance = new Attendance({
        studentid: student._id,
        name: student.name,
        branch: student.branch,
        busNumber: student.busNumber,
        checkInTime: currentTime,
        checkOutTime: null,
        date: today,
      });

      await attendance.save();
      return res.status(200).json({ message: "Check-in recorded", type: "checkin" });
    } else if (!attendance.checkOutTime) {
      // Second scan – mark check-out
      attendance.checkOutTime = currentTime;
      await attendance.save();
      return res.status(200).json({ message: "Check-out recorded", type: "checkout" });
    } else {
      // Already checked out
      return res.status(200).json({ message: "Already checked out", type: "done" });
    }
  } catch (err) {
    console.error("Scan Error:", err);
    return res.status(500).json({ message: "Server error during scan" });
  }
};
