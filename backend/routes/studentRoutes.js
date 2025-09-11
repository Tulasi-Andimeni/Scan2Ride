// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByBus, deleteAllStudents,
} = require('../controllers/studentController');
const Student = require("../models/studentModel");


// POST /api/students
router.post('/', createStudent);

// GET /api/students
router.get('/', getAllStudents);

// // GET /api/students/:studentid
// router.get('/:studentid', getStudentById);

// // PUT /api/students/:studentid
// router.put('/:studentid', updateStudent);

// DELETE /api/students/:studentid
router.delete('/:studentid', deleteStudent);

// GET /api/students/bus/:busNumber
router.get('/bus/:busNumber', getStudentsByBus);

// DELETE /api/students
router.delete('/', deleteAllStudents);


// // Restore a soft-deleted student
// 🔁 Soft delete student by ID
router.put('/soft-delete/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student soft-deleted", student });
  } catch (error) {
    res.status(500).json({ message: "Failed to soft delete student", error });
  }
});

// 🧠 Restore soft-deleted student
router.put('/restore/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    res.status(200).json({ message: "Student restored", student });
  } catch (error) {
    res.status(500).json({ message: "Failed to restore student", error });
  }
});

// 📌 Keep this at the bottom
router.get('/:studentid', getStudentById);
router.put('/:studentid', updateStudent);

// ✅ Already present (no changes needed if you have this)
router.get('/bus/:busNumber', getStudentsByBus);





module.exports = router;


// const express = require('express');
// const router = express.Router();
// const {
//     createStudent,
//     getAllStudents,
//     getStudentById,
//     updateStudent,
//     softDeleteStudent,
//     restoreStudent,
//     getStudentsByBus,
//     deleteAllStudents,
//     getSoftDeletedStudents,
// } = require('../controllers/studentController');

// // --- Specific Routes First ---

// // GET /api/students/deleted - Get all soft-deleted students
// router.get('/deleted', getSoftDeletedStudents);

// // GET /api/students/bus/:busNumber - Get students by bus number (active only)
// router.get('/bus/:busNumber', getStudentsByBus);

// // DELETE /api/students/all - Permanently delete all students (use with caution!)
// router.delete('/all', deleteAllStudents); // Changed path to avoid conflict with /:studentid

// // PUT /api/students/restore/:studentid - Restore a soft-deleted student
// router.put('/restore/:studentid', restoreStudent);

// // --- General Routes Last ---

// // POST /api/students - Create a new student
// router.post('/', createStudent);

// // GET /api/students - Get all active students (make sure this is before :studentid if you want it to be /api/students with no params)
// router.get('/', getAllStudents);


// // IMPORTANT: Keep these general parameter routes at the very bottom
// // to prevent them from catching more specific routes like '/deleted' or '/bus/:busNumber'
// // GET /api/students/:studentid - Get a single student by studentid (active only)
// router.get('/:studentid', getStudentById);

// // PUT /api/students/:studentid - Update a student by studentid (active only)
// router.put('/:studentid', updateStudent);

// // DELETE /api/students/:studentid - Soft delete a student
// router.delete('/:studentid', softDeleteStudent); // This is now explicitly for soft delete


// module.exports = router;