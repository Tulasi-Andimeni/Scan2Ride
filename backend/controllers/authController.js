// const User = require("../models/UserModel");
// const jwt = require("jsonwebtoken");

// exports.signup = async (req, res) => {
//   const { username, email, password, role } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = new User({ username, email, password, role });
//     await user.save();

//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     // Create JWT token with user id and role in payload
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };







// const User = require('../models/UserModel');
// const bcrypt = require('bcryptjs');

// // Signup controller
// exports.signup = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();
//     res.status(201).json({ message: 'Signup successful', user: { name, email, role } });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Profile controller
// exports.getProfile = async (req, res) => {
//   const { email } = req.params;
//   try {
//     const user = await User.findOne({ email }).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// exports.signin = async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//     console.log("Login Request:", { email, password, role }); // Log input

//     const user = await User.findOne({ email });
//     console.log("Found User:", user); // ✅ Log matched user

//     if (!user) return res.status(401).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//     if (user.role !== role) return res.status(403).json({ message: "Incorrect role selected" });

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error("Signin Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// const express = require('express');
// const bcrypt = require('bcryptjs');
// const router = express.Router();
// const { signup, signin, getProfile } = require('../controllers/authController');
// const nodemailer = require('nodemailer');
// const User = require('../models/User'); // Make sure this is your correct User model

// // In-memory OTP store
// let otpStore = {};

// // Existing Auth Routes
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists.' });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Save new user
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();

//     res.json({ message: 'Signup successful.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Signup failed.' });
//   }
// });

// router.post('/signin', async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const user = await User.findOne({ email, role });
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

//     res.json({ user, message: 'Login successful.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Login failed.' });
//   }
// });

// router.get('/profile/:email', getProfile);

// // ✅ Forgot Password Routes

// // Send OTP
// router.post('/forgot-password', async (req, res) => {
//   const { email, role } = req.body;

//   if (!email || !role) return res.status(400).json({ message: 'Email and role are required.' });

//   const user = await User.findOne({ email, role });
//   if (!user) return res.status(404).json({ message: 'User not found.' });

//   const otp = Math.floor(100000 + Math.random() * 900000);
//   otpStore[email] = otp;

//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'your-email@gmail.com', // Your Gmail
//       pass: 'your-app-password'     // Your App password
//     }
//   });

//   const mailOptions = {
//     from: 'SCAN 2 RIDE <your-email@gmail.com>',
//     to: email,
//     subject: 'Password Reset OTP',
//     text: Your OTP for password reset is ${otp}. It is valid for 5 minutes.
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'OTP sent successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to send OTP.' });
//   }
// });

// // Verify OTP
// router.post('/verify-otp', (req, res) => {
//   const { email, otp } = req.body;

//   if (otpStore[email] && otpStore[email] == otp) {
//     delete otpStore[email]; // OTP is valid, remove it
//     res.json({ message: 'OTP verified successfully.' });
//   } else {
//     res.status(400).json({ message: 'Invalid or expired OTP.' });
//   }
// });

// // Reset Password
// router.post('/reset-password', async (req, res) => {
//   const { email, newPassword } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     // Hash new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: 'Password reset successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to reset password.' });
//   }
// });

// module.exports = router;




// const bcrypt = require('bcryptjs');
// const User = require('../models/UserModel');
// const nodemailer = require('nodemailer');

// let otpStore = {}; // In-memory OTP store

// // 🔹 Signup
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists.' });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();

//     res.json({ message: 'Signup successful.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Signup failed.' });
//   }
// };

// // 🔹 Signin
// exports.signin = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const user = await User.findOne({ email, role });
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

//     res.json({ user, message: 'Login successful.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Login failed.' });
//   }
// };

// // 🔹 Get Profile
// exports.getProfile = async (req, res) => {
//   const { email } = req.params;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch profile' });
//   }
// };



// // Send OTP
// exports.sendOtp = async (req, res) => {
//   const { email, role } = req.body;
//   if (!email || !role) return res.status(400).json({ message: 'Email and role are required.' });

//   try {
//     const user = await User.findOne({ email, role });
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `Scan2Ride <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Password Reset OTP',
//       text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
//     });

//     res.json({ message: 'OTP sent successfully.' });
//   } catch (err) {
//     console.error('OTP error:', err);
//     res.status(500).json({ message: 'Failed to send OTP.' });
//   }
// };

// // Verify OTP
// exports.verifyOtp = (req, res) => {
//   const { email, otp } = req.body;
//   const entry = otpStore[email];

//   if (!entry) return res.status(400).json({ message: 'No OTP sent.' });
//   if (Date.now() > entry.expiresAt) return res.status(400).json({ message: 'OTP expired.' });

//   if (parseInt(otp) === entry.otp) {
//     delete otpStore[email];
//     res.json({ message: 'OTP verified successfully.' });
//   } else {
//     res.status(400).json({ message: 'Invalid OTP.' });
//   }
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
//   const { email, newPassword } = req.body;
//   if (!email || !newPassword) return res.status(400).json({ message: 'Missing email or password.' });

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(newPassword, salt);

//     user.password = hashed;
//     await user.save();

//     res.json({ message: 'Password updated successfully.' });
//   } catch (err) {
//     console.error('Reset error:', err);
//     res.status(500).json({ message: 'Password reset failed.' });
//   }
// };




const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const nodemailer = require('nodemailer');
const otpStore = {}; // In-memory store for demo

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists.' });
    const hashed = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashed, role }).save();
    res.json({ message: 'Signup successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed.' });
  }
};

exports.signin = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email, role });
  if (!user) return res.status(404).json({ message: 'User not found.' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials.' });
  res.json({ user, message: 'Login successful.' });
};

exports.getProfile = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json(user);
};

exports.sendOtp = async (req, res) => {
  try {
    const { email, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Scan2Ride <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset OTP',
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('OTP sending failed:', error);  // <--- Add this
    res.status(500).json({ message: 'OTP sending failed', error: error.message });
  }
};


exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const data = otpStore[email];
  if (!data) return res.status(400).json({ message: 'No OTP sent.' });
  if (Date.now() > data.expiresAt) return res.status(400).json({ message: 'OTP expired.' });
  if (parseInt(otp) !== data.otp) return res.status(400).json({ message: 'Invalid OTP.' });
  delete otpStore[email];
  res.json({ message: 'OTP verified successfully.' });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found.' });
  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();
  res.json({ message: 'Password updated successfully.' });
};
