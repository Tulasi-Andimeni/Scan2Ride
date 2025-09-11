// const express = require("express");
// const router = express.Router();
// const Attendance = require("../models/attendance");

// router.get("/today-attendance", async (req, res) => {
//   const today = new Date().toISOString().split("T")[0];
//   try {
//     const data = await Attendance.find({ date: today });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching attendance" });
//   }
// });

// module.exports = router;



// // routes/attendanceRoute.js
// const express = require("express");
// const router = express.Router();
// const { getTodayAttendance, getAttendanceByDate, getStudentAttendanceHistory } = require("../controllers/attendanceController");

// // GET /api/attendance/today
// router.get("/attendance/today", getTodayAttendance);

// // GET /api/attendance/date/:date (e.g., /api/attendance/date/2023-10-27)
// router.get("/attendance/date/:date", getAttendanceByDate);

// // GET /api/attendance/student/:studentid (e.g., /api/attendance/student/S001)
// router.get("/attendance/student/:studentid", getStudentAttendanceHistory);


// module.exports = router;







// const express = require("express");
// const router = express.Router();

// const {
//   getTodayAttendance,
//   getAttendanceByDate,
//   getStudentAttendanceHistory,
//   getBusWiseAttendance,
//   getAttendanceSummary, 
//   getBusPieData,
//   getBusTodayData,
// } = require("../controllers/attendanceController");

// // Define your routes
// router.get("/today", getTodayAttendance);
// router.get("/date/:date", getAttendanceByDate);
// router.get("/student/:studentid", getStudentAttendanceHistory);
// router.get("/bus-wise", getBusWiseAttendance); // ✅ New bus-wise route
// router.get("/bus-pie/:id", getBusPieData);
// router.get("/bus-students/:id", getBusTodayData);
 


// router.get("/summary", getAttendanceSummary);

// module.exports = router;





const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

const {
  getTodayAttendance,
  getAttendanceByDate,
  getStudentAttendanceHistory,
  getBusWiseAttendance,
  getAttendanceSummary,
  getBusPieData,
  getBusTodayData,
} = attendanceController;

router.get("/today", getTodayAttendance);
router.get("/date/:date", getAttendanceByDate);
router.get("/student/:studentid", getStudentAttendanceHistory);
router.get("/bus-wise", getBusWiseAttendance);
router.get("/summary", getAttendanceSummary);
router.get("/bus-pie/:id", getBusPieData);
router.get("/bus-students/:id", getBusTodayData);

module.exports = router;
