// src/components/Driversignup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { FaUser, FaMobileAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Driversignup() {
  const navigate = useNavigate();
  const [driverName, setDriverName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('driver');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/; // Indian 10-digit mobile number starting with 6-9
    return mobileRegex.test(mobile);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!driverName.trim()) {
      toast.error('Driver Name is required');
      return;
    }

    if (!mobileNumber.trim()) {
      toast.error('Mobile Number is required');
      return;
    }

    if (!validateMobile(mobileNumber)) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (!confirmPassword) {
      toast.error('Confirm Password is required');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters, include upper and lowercase letters, a number, and a special character.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    toast.success('Signup successful!');
    setTimeout(() => {
      navigate('/signin');
    }, 3000);
  };

  return (
    <>
      <ToastContainer />
      <div className="register-background">
        <div className="register-top">
          <h1>SCAN 2 RIDE</h1>
        </div>
        <div className="register-down">
          <div className="register-right">
            <img src="./scan8.png" alt="Signup Visual" />
          </div>
          <div className="register-left">
            <div className="register-tab-buttons">
              <button
                className={`register-tab-btn ${selectedRole === 'admin' ? 'active' : ''}`}
                onClick={() => navigate('/signup')}
              >
                Admin
              </button>
              <button
                className={`register-tab-btn ${selectedRole === 'driver' ? 'active' : ''}`}
                onClick={() => setSelectedRole('driver')}
              >
                Driver
              </button>
            </div>

            <h2>Create Driver Account</h2>

            <form onSubmit={handleSignUp}>
              <div className="register-input-icon-wrapper">
                <FaUser className="register-input-icon" />
                <input
                  type="text"
                  placeholder="Driver Name"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                />
              </div>

              <div className="register-input-icon-wrapper">
                <FaMobileAlt className="register-input-icon" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>

              <div className="register-input-icon-wrapper">
                <FaLock className="register-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="register-eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="register-input-icon-wrapper">
                <FaLock className="register-input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="register-eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="register-auth-btn-wrapper">
                <button className="register-auth-btn" type="submit">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="register-switch-text">
              Already have an account?
              <span className="register-switch-link" onClick={() => navigate('/login')}>
                {' '}Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Driversignup;
