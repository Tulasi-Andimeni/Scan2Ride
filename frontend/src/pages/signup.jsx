import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaGithub,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^]).{8,}$/.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      return toast.error('Please fill all fields including role!');
    }

    if (!validatePassword(password)) {
      return toast.error('Password must be strong (uppercase, lowercase, number, symbol, min 8 chars)');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        role,
      });
      toast.success('Signup successful! Please login now.');
      // ⏩ Navigate to SignIn page without saving anything in localStorage
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleDemoIconClick = (platform) => {
    if (!role) {
      toast.warning('Please select a role (Admin or Driver) before proceeding!');
    } else {
      toast.success(`${role.toUpperCase()} signup via ${platform} (Demo Only)`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="register-background">
        <div className="register-top">
          <div className="register-logo"></div>
          <h1>SCAN2RIDE</h1>
        </div>

        <div className="register-down">
          {/* <div className="register-right">
            <img src="./scan8.png" alt="Visual" />
          </div> */}

          <div className="register-left">
            <h2>Create Account</h2>
            <p className="register-subtitle">Please enter your details</p>

            <form onSubmit={handleSignup}>
              <select
                className="signup-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="driver">Driver</option>
              </select>

              <div className="register-input-icon-wrapper">
                <FaUser className="register-input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="register-input-icon-wrapper">
                <FaEnvelope className="register-input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <button className="register-auth-btn" type="submit">
                Sign Up
              </button>
            </form>

            <div className="register-orline">― OR ―</div>
            <div className="register-subtext">Sign up with</div>

            <div className="register-icons">
              <div
                className="register-googleicon"
                onClick={() => handleDemoIconClick('Google')}
              >
                <FaGoogle />
              </div>
              <div
                className="register-googleicon"
                onClick={() => handleDemoIconClick('Facebook')}
              >
                <FaFacebookF />
              </div>
              <div
                className="register-googleicon"
                onClick={() => handleDemoIconClick('GitHub')}
              >
                <FaGithub />
              </div>
            </div>

            <p className="register-switch-text">
              Already have an account?
              <span
                className="register-switch-link"
                onClick={() => navigate('/signin')}
              >
                {' '}Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
