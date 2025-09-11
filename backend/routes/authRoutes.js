// const express = require("express");
// const router = express.Router();
// const { signup, login } = require("../controllers/authController");
// const { protect } = require("../middleware/auth");

// router.post("/signup", signup);
// router.post("/login", login);

// // Example protected admin route
// router.get("/admin-only", protect(["admin"]), (req, res) => {
//   res.json({ message: "Welcome Admin!" });
// });

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const { signup, getProfile } = require('../controllers/authController');

// router.post('/signup', signup);
// router.get('/profile/:email', getProfile);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { signup, signin, getProfile } = require('../controllers/authController');

// // Routes
// router.post('/signup', signup);
// router.post('/signin', signin);
// router.get('/profile/:email', getProfile);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { signup, signin, getProfile } = require('../controllers/authController');

// router.post('/signup', signup);
// router.post('/signin', signin);  // ✅ Add this
// router.get('/profile/:email', getProfile);

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const {
//   signup,
//   signin,
//   getProfile,
//   sendOtp,
//   verifyOtp,
//   resetPassword
// } = require('../controllers/authController');

// // 🔐 Auth Routes
// router.post('/signup', signup);
// router.post('/signin', signin);
// router.get('/profile/:email', getProfile);

// // 🔐 Forgot Password Routes
// // router.post('/forgot-password', sendOtp);
// // router.post('/verify-otp', verifyOtp);
// // router.post('/reset-password', resetPassword);
// router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtp);
// router.post('/reset-password', resetPassword);

// module.exports = router;




const express = require('express');
const router = express.Router();
const {
  signup, signin, getProfile,
  sendOtp, verifyOtp, resetPassword
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile/:email', getProfile);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;