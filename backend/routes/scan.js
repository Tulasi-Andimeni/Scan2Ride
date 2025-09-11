// const express = require("express");
// const router = express.Router();
// const { handleScan } = require("../controllers/scanController");

// router.post("/scan", handleScan);

// module.exports = router;




// // routes/scan.js
// const express = require("express");
// const router = express.Router();
// const { handleScan } = require("../controllers/scanController");

// // POST /api/student/scan
// // router.post("/student/scan", handleScan);
// router.post("/scan", handleScan);


// module.exports = router;



const express = require("express");
const router = express.Router();
const { handleScan } = require("../controllers/scanController");

// POST /api/student/scan
router.post("/scan", handleScan);

module.exports = router;
