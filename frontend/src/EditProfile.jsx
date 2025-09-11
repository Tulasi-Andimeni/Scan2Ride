import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Profilepage.css";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaPhoneAlt,
  FaBus,
  FaCheckCircle,
} from "react-icons/fa";

function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    busNumber: "",
  });

  const [formValid, setFormValid] = useState({
    name: false,
    email: false,
    phone: false,
    role: false,
    password: false,
    busNumber: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    busNumber: "",
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState("public/user-profile-icon-vector-avatar-600nw-2220431045.webp");

  const validateField = (name, value) => {
    let isValid = false;
    let errorMsg = "";

    switch (name) {
      case "name":
        isValid = value.trim().length > 2;
        errorMsg = isValid ? "" : "Name must be at least 3 characters";
        break;
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errorMsg = isValid ? "" : "Invalid email address";
        break;
      case "phone":
        isValid = /^[0-9]{10}$/.test(value);
        errorMsg = isValid ? "" : "Phone must be 10 digits";
        break;
      case "password":
        isValid = value.length >= 6;
        errorMsg = isValid ? "" : "Password must be at least 6 characters";
        break;
      case "role":
        isValid = value === "Driver" || value === "Admin";
        errorMsg = isValid ? "" : "Please select a role";
        break;
      case "busNumber":
        isValid = value.trim().length > 0;
        errorMsg = isValid ? "" : "Bus number is required";
        break;
      default:
        break;
    }

    setFormErrors((prev) => ({ ...prev, [name]: errorMsg }));
    setFormValid((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSave = () => {
    if (Object.values(formValid).every(Boolean)) {
      alert(`Settings Saved!\nSelected Role: ${formData.role}`);
      navigate("/");
    } else {
      alert("Please fill all fields correctly before saving.");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const showValidTick = (field) => touched[field] && formValid[field];
  const showErrorMsg = (field) => touched[field] && formErrors[field];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Edit Profile</h2><div className="close-icon" onClick={() => navigate("/")}>
  &times;
</div>

        <div className="card-body">
          {/* Left Section */}
          <div className="profile-left">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {/* <h2 className="profile-name">{formData.name || "Your Name"}</h2> */}
          </div>

          {/* Right Section */}
          <div className="form-right">
            {/* Name */}
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {showValidTick("name") && (
                  <FaCheckCircle className="valid-icon" />
                )}
              </div>
              {showErrorMsg("name") && (
                <small className="error-msg">{formErrors.name}</small>
              )}
            </div>

            {/* Role */}
            <div className="form-row">
              <label>SELECT YOUR ROLE</label>
              <div className="input-with-icon">
                <FaUserTag className="input-icon" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    Driver/Admin
                  </option>
                  <option value="Driver">Driver</option>
                  <option value="Admin">Admin</option>
                </select>
                {showValidTick("role") && (
                  <FaCheckCircle className="valid-icon" />
                )}
              </div>
              {showErrorMsg("role") && (
                <small className="error-msg">{formErrors.role}</small>
              )}
            </div>

            {/* Bus Number */}
            <div className="form-row">
              <label htmlFor="busNumber">Bus Number</label>
              <div className="input-with-icon">
                <FaBus className="input-icon" />
                <input
                  type="text"
                  id="busNumber"
                  name="busNumber"
                  placeholder="Bus number"
                  value={formData.busNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {showValidTick("busNumber") && (
                  <FaCheckCircle className="valid-icon" />
                )}
              </div>
              {showErrorMsg("busNumber") && (
                <small className="error-msg">{formErrors.busNumber}</small>
              )}
            </div>

            {/* Email */}
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {showValidTick("email") && (
                  <FaCheckCircle className="valid-icon" />
                )}
              </div>
              {showErrorMsg("email") && (
                <small className="error-msg">{formErrors.email}</small>
              )}
            </div>

            {/* Password */}
            {/* <div className="form-row">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  role="button"
                  tabIndex={0}
                  aria-label="Toggle password visibility"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setShowPassword(!showPassword);
                    }
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {showValidTick("password") && (
                  <FaCheckCircle className="valid-icon" />
                )}
              </div>
              {showErrorMsg("password") && (
                <small className="error-msg">{formErrors.password}</small>
              )}
            </div> */}
            <div className="form-row">
                          <label>PASSWORD</label>
                          <div className="password-input-wrapper input-with-icon">
                            <FaLock className="input-icon" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="password"
                              value={formData.password}
                              onChange={handleChange}
                            />{formValid.password && (
                              <FaCheckCircle className="valid-icon-password" />
                            )}
                            {/* <span
                              className="toggle-icon"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span> */}
                            {formValid.password && (
                              <FaCheckCircle className="valid-icon-password" />
                            )}
                          </div>
                        </div>
            

            {/* Phone */}
            <div className="form-row">
              <label htmlFor="phone">Phone</label>
              <div className="input-with-icon">
                <FaPhoneAlt className="input-icon" />
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {showValidTick("phone") && (
                  <FaCheckCircle className="valid-icon" />
                )}
              </div>
              {showErrorMsg("phone") && (
                <small className="error-msg">{formErrors.phone}</small>
              )}
            </div>

            {/* Save button */}
            <div className="button-row">
              <button
                type="button"
                className="save-btn"
                onClick={handleSave}
                disabled={!Object.values(formValid).every(Boolean)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
