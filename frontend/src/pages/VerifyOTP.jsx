import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../config';
import './login.css';

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, role } = location.state || {};
  const [otp, setOtp] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/verify-otp`, { email, otp });
      toast.success(res.data.message);
      setTimeout(() => {
        navigate('/reset-password', { state: { email, role } });
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
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
            <h2>Verify OTP</h2>
            <form onSubmit={handleVerify}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button className="auth-btn" type="submit">Verify OTP</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyOTP;
