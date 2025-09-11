import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminforget.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope } from 'react-icons/fa';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Enter a valid email address');
      return;
    }

    toast.success('Reset link sent to your email!');
    setTimeout(() => {
      navigate('/SignIn');
    }, 3000);
  };

  return (
    <>
      <ToastContainer />
      <div className="forgot-container">
        <div className="forgot-header">
          <h1 className="forgot-title">SCAN 2 RIDE</h1>
        </div>

        <div className="forgot-body">
          <div className="forgot-left-panel" />
          <div className="forgot-right-panel">
            <h2 className="forgot-heading"> Admin Forgot Password?</h2>
            <p className="forgot-description">
              No worries! Just enter your registered email address below and we’ll send you a password reset link.
            </p>

            <div className="forgot-instruction-box">
              <p>💡 <strong>Tip:</strong> If you don’t see the email soon, check your spam or junk folder.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="forgot-input-group">
                <FaEnvelope className="forgot-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="forgot-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="forgot-submit-btn">Send Reset Link</button>
            </form>

            <p className="forgot-support-text">
              Need help? <a href="mailto:support@scan2ride.com" className="forgot-support-link">Contact Support</a>
            </p>

            <p className="forgot-footer-text">
              Remembered your password?
              <span className="forgot-login-link" onClick={() => navigate('/SignIn')}>
                {' '}Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
