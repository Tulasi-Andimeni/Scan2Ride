// const express = require("express");
// const router = express.Router();
// const Student = require("../models/studentModel"); // import Student model

// router.get("/:id", async (req, res) => {
//   try {
//     const busId = req.params.id;
//     console.log("Bus ID requested:", busId);
//     const students = await Student.find({ busNumber: busId });
//     if (students.length > 0) {
//       res.json({ busNumber: busId, students });
//     } else {
//       res.status(404).json({ message: "Ee bus number tho students leru ra!" });
//     }
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     res.status(500).json({ message: "Server error ra: " + error.message });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
// const Student = require("../models/studentModel");
const busController = require('../controllers/buscontroller');


router.get("/:id", busController.getBusDetails);
module.exports = router;

