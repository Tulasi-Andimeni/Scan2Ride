const express = require("express");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Example: Route only accessible to admin
router.get("/admin-only", protect(["admin"]), (req, res) => {
  res.send("🔐 This is confidential admin data");
});

// Example: Route only accessible to driver
router.get("/driver-only", protect(["driver"]), (req, res) => {
  res.send("🚌 Welcome driver! Here's your schedule.");
});

// Example: Accessible to both admin and driver
router.get("/common", protect(["admin", "driver"]), (req, res) => {
  res.send(`👋 Hello ${req.user.role}, you can access this common route`);
});

module.exports = router;
