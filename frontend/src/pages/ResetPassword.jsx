import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../config';
import './login.css';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, role } = location.state || {};
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/reset-password`, { email, password });
      toast.success(res.data.message);
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signin-background">
        <div className="signin-top">
          <div className="signin-logo"></div>
          <h1>SCAN 2 RIDE</h1>
        </div>

        <div className="signin-down">
          <div className="signin-left">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button className="auth-btn" type="submit">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
