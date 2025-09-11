// controllers/studentController.js
const Student = require("../models/studentModel");

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, studentid, branch, busNumber, location } = req.body;

    // Basic validation
    if (!name || !studentid || !branch || !busNumber || !location) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if student already exists by studentid
    const existing = await Student.findOne({ studentid });
    if (existing) {
      return res.status(409).json({ message: "Student with this ID already exists." }); // 409 Conflict
    }

    const student = new Student({ name, studentid, branch, busNumber, location });
    await student.save();
    res.status(201).json({ message: "Student created successfully.", student });
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(500).json({ message: "Server error creating student." });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }); // Latest first
    res.json(students);
  } catch (err) {
    console.error("Error fetching all students:", err);
    res.status(500).json({ message: "Server error fetching students." });
  }
};

// Get a single student by studentid
exports.getStudentById = async (req, res) => {
    const { studentid } = req.params;
    try {
        const student = await Student.findOne({ studentid });
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        res.json(student);
    } catch (err) {
        console.error("Error fetching student by ID:", err);
        res.status(500).json({ message: "Server error fetching student." });
    }
};

// Update a student by studentid
exports.updateStudent = async (req, res) => {
    const { studentid } = req.params;
    const updates = req.body; // Contains the fields to update

    try {
        // findOneAndUpdate by studentid, return the new document, run validators on update
        const student = await Student.findOneAndUpdate(
            { studentid },
            { $set: updates }, // Use $set to update specific fields
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        res.json({ message: "Student updated successfully.", student });
    } catch (err) {
        console.error("Error updating student:", err);
        res.status(500).json({ message: "Server error updating student." });
    }
};


// 📌 Get students by busNumber
exports.getStudentsByBus = async (req, res) => {
  try {
    const busNumber = req.params.busNumber;
    const students = await Student.find({ busNumber });

    if (!students.length) {
      return res.status(404).json({ message: "Ee bus number tho students leru ra!" });
    }

    res.json({ busNumber, students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error ra: " + error.message });
  }
};



// Delete a student by studentid
// exports.deleteStudent = async (req, res) => {
//   const { studentid } = req.params;
//   try {
//     const student = await Student.findOneAndDelete({ studentid });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found." });
//     }
//     res.json({ message: "Student deleted successfully.", student });
//   } catch (err) {
//     console.error("Error deleting student:", err);
//     res.status(500).json({ message: "Server error deleting student." });
//   }
// };

// Get students by bus number
exports.getStudentsByBus = async (req, res) => {
  const { busNumber } = req.params;
  try {
    const students = await Student.find({ busNumber }).sort({ name: 1 }); // Sort by name ascending
    res.json(students);
  } catch (err) {
    console.error("Error fetching students by bus number:", err);
    res.status(500).json({ message: "Server error fetching students by bus number." });
  }
};


// Delete all students
exports.deleteAllStudents = async (req, res) => {
  try {
    await Student.deleteMany({});
    res.status(200).json({ message: "All students deleted successfully." });
  } catch (err) {
    console.error("Error deleting all students:", err);
    res.status(500).json({ message: "Server error deleting all students." });
  }
};


// Soft Delete a student by studentid
exports.deleteStudent = async (req, res) => {
  const { studentid } = req.params;
  try {
    const student = await Student.findOneAndUpdate(
      { studentid },
      { deleted: true },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.json({ message: "Student soft-deleted successfully.", student });
  } catch (err) {
    console.error("Error soft-deleting student:", err);
    res.status(500).json({ message: "Server error deleting student." });
  }
};





// const Student = require("../models/studentModel");

// // Create a new student
// exports.createStudent = async (req, res) => {
//     try {
//         const { name, studentid, branch, busNumber, location } = req.body;

//         // Basic validation
//         if (!name || !studentid || !branch || !busNumber || !location) {
//             return res.status(400).json({ message: "All fields are required." });
//         }

//         // Check if student already exists by studentid
//         const existing = await Student.findOne({ studentid });
//         if (existing) {
//             return res.status(409).json({ message: "Student with this ID already exists." }); // 409 Conflict
//         }

//         const student = new Student({ name, studentid, branch, busNumber, location });
//         await student.save();
//         res.status(201).json({ message: "Student created successfully.", student });
//     } catch (err) {
//         console.error("Error creating student:", err);
//         res.status(500).json({ message: "Server error creating student." });
//     }
// };

// // Get all active students (not soft-deleted)
// exports.getAllStudents = async (req, res) => {
//     try {
//         // Find students where 'deleted' is false
//         const students = await Student.find({ deleted: false }).sort({ createdAt: -1 }); // Latest first
//         res.json(students);
//     } catch (err) {
//         console.error("Error fetching all students:", err);
//         res.status(500).json({ message: "Server error fetching students." });
//     }
// };

// // Get a single student by studentid (only if not soft-deleted)
// exports.getStudentById = async (req, res) => {
//     const { studentid } = req.params;
//     try {
//         const student = await Student.findOne({ studentid, deleted: false }); // Find if not deleted
//         if (!student) {
//             return res.status(404).json({ message: "Student not found or has been soft-deleted." });
//         }
//         res.json(student);
//     } catch (err) {
//         console.error("Error fetching student by ID:", err);
//         res.status(500).json({ message: "Server error fetching student." });
//     }
// };

// // Update a student by studentid
// exports.updateStudent = async (req, res) => {
//     const { studentid } = req.params;
//     const updates = req.body; // Contains the fields to update

//     try {
//         // Exclude 'studentid' from updates to prevent changing the unique ID
//         if (updates.studentid) {
//             delete updates.studentid;
//         }

//         // findOneAndUpdate by studentid, return the new document, run validators on update
//         const student = await Student.findOneAndUpdate(
//             { studentid, deleted: false }, // Only update if not soft-deleted
//             { $set: updates }, // Use $set to update specific fields
//             { new: true, runValidators: true }
//         );

//         if (!student) {
//             return res.status(404).json({ message: "Student not found or has been soft-deleted." });
//         }
//         res.json({ message: "Student updated successfully.", student });
//     } catch (err) {
//         console.error("Error updating student:", err);
//         res.status(500).json({ message: "Server error updating student." });
//     }
// };

// // Soft Delete a student by studentid
// exports.softDeleteStudent = async (req, res) => {
//     const { studentid } = req.params;
//     try {
//         const student = await Student.findOneAndUpdate(
//             { studentid, deleted: false }, // Ensure it's not already deleted
//             { deleted: true },
//             { new: true }
//         );
//         if (!student) {
//             return res.status(404).json({ message: "Student not found or already soft-deleted." });
//         }
//         res.json({ message: "Student soft-deleted successfully.", student });
//     } catch (err) {
//         console.error("Error soft-deleting student:", err);
//         res.status(500).json({ message: "Server error soft-deleting student." });
//     }
// };

// // Restore a soft-deleted student by studentid
// exports.restoreStudent = async (req, res) => {
//     const { studentid } = req.params;
//     try {
//         const student = await Student.findOneAndUpdate(
//             { studentid, deleted: true }, // Find if it's currently soft-deleted
//             { deleted: false },
//             { new: true }
//         );
//         if (!student) {
//             return res.status(404).json({ message: "Student not found or not soft-deleted." });
//         }
//         res.json({ message: "Student restored successfully.", student });
//     } catch (error) {
//         console.error("Error restoring student:", error);
//         res.status(500).json({ message: "Failed to restore student." });
//     }
// };

// // Get students by bus number (only active ones)
// exports.getStudentsByBus = async (req, res) => {
//     const { busNumber } = req.params;
//     try {
//         const students = await Student.find({ busNumber, deleted: false }).sort({ name: 1 }); // Sort by name ascending
//         res.json(students);
//     } catch (err) {
//         console.error("Error fetching students by bus number:", err);
//         res.status(500).json({ message: "Server error fetching students by bus number." });
//     }
// };

// // Permanently delete all students (use with extreme caution!)
// exports.deleteAllStudents = async (req, res) => {
//     try {
//         await Student.deleteMany({});
//         res.status(200).json({ message: "All students permanently deleted successfully." });
//     } catch (err) {
//         console.error("Error deleting all students:", err);
//         res.status(500).json({ message: "Server error deleting all students." });
//     }
// };

// // Get all soft-deleted students
// exports.getSoftDeletedStudents = async (req, res) => {
//     try {
//         const students = await Student.find({ deleted: true }).sort({ updatedAt: -1 });
//         res.json(students);
//     } catch (err) {
//         console.error("Error fetching soft-deleted students:", err);
//         res.status(500).json({ message: "Server error fetching soft-deleted students." });
//     }
// };
