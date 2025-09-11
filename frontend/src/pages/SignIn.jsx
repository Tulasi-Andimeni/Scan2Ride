import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import './signup.css';
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      return toast.error('Please fill all fields including role!');
    }
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signin`, {
        email,
        password,
        role,
      });
      toast.success(`${role} Login successful!`);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.user.role);
      setEmail('');
      setPassword('');
      setRole('');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const handleDemoIconClick = (platform) => {
    if (!role) {
      toast.warning('Please select a role (Admin or Driver) before proceeding!');
    } else {
      toast.success(`${role.toUpperCase()} login via ${platform} (Demo Only)`);
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
          <div className="register-left">
            <h2>Sign In</h2>
            <p className="register-subtitle">Enter your credentials to login</p>
            <form onSubmit={handleSignIn}>
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
                Sign In
              </button>
            </form>
            <div className="register-orline">― OR ―</div>
            <div className="register-subtext">Sign in with</div>
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
              Forgot your password?
              <span
                className="register-switch-link"
                onClick={() => navigate('/forgotpassword')}
              >
                {' '}Reset
              </span>
            </p>
            <p className="register-switch-text">
              Don't have an account?
              <span
                className="register-switch-link"
                onClick={() => navigate('/signup')}
              >
                {' '}Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

