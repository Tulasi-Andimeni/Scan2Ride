import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaMobileAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './driverforget.css';

function DriverForgotPassword() {
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const validateMobile = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile format
    return mobileRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobile.trim()) {
      toast.error('Mobile number is required');
      return;
    }

    if (!validateMobile(mobile)) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }

    toast.success('Reset link sent to your mobile!');
    setTimeout(() => {
      navigate('/driver');
    }, 3000);
  };

  return (
    <>
      <ToastContainer />
      <div className="driver-forgot-container">
        <div className="driver-forgot-header">
          <h1 className="driver-forgot-title">SCAN 2 RIDE</h1>
        </div>

        <div className="driver-forgot-body">
          <div className="driver-forgot-left-panel" />

          <div className="driver-forgot-right-panel">
            <h2 className="driver-forgot-heading">Driver Forgot Password?</h2>
            <p className="driver-forgot-description">
              Enter your registered mobile number and we’ll send you a reset link.
            </p>

            <div className="driver-forgot-input-group">
              <FaMobileAlt className="driver-forgot-icon" />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="driver-forgot-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength="10"
              />
            </div>

            <button type="submit" className="driver-forgot-submit-btn" onClick={handleSubmit}>
              Send Reset Link
            </button>

            <p className="driver-forgot-footer-text">
              Remembered your password?
              <span className="driver-forgot-login-link" onClick={() => navigate('/driver')}>
                {' '}Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverForgotPassword;
