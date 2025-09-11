// src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './forgotpassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    if (!role || !email) {
      toast.error('Please select a role and enter your registered email!');
      return;
    }

    try {
      // Example: Replace this API with your backend endpoint
await axios.post('http://localhost:5000/api/auth/send-otp', { email, role });
// await axios.post('http://localhost:5000/api/auth/forgot-password', {
//   adminEmail: email,
//   // dateOfBirth: '', // You'll add this next
// });



      toast.success('OTP sent successfully to your email!');

      setTimeout(() => {
        navigate('/verify-otp', { state: { email, role } }); // Pass email and role to next page
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="forgot-wrapper">
      <ToastContainer />
      <div className="forgot-container">
        <div className="forgot-logo"></div>
        <h1 className="forgot-title">SCAN 2 RIDE</h1>
        <h2>Forgot Password</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="driver">Driver</option>
        </select>

        <input
          type="email"
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSendOTP}>Send OTP</button>

        <p style={{ marginTop: '15px', color: 'white' }}>
          Remembered your password?{' '}
          <span style={{ color: '#FF8A00', cursor: 'pointer' }} onClick={() => navigate('/signin')}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
