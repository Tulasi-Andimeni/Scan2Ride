import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profilepage.module.css";
import {
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaPhoneAlt,
  FaBus,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function ProfilePage() {
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
    password: false,
    role: false,
    busNumber: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState("public/user-profile-icon-vector-avatar-600nw-2220431045.webp");

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    } else {
      setProfileImage("public/user-profile-icon-vector-avatar-600nw-2220431045.webp");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let isValid = false;
    if (name === "name") isValid = value.trim().length > 2;
    if (name === "email") isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (name === "phone") isValid = /^[0-9]{10}$/.test(value);
    if (name === "password") isValid = value.length >= 6;
    if (name === "role") isValid = value === "Driver" || value === "Admin";
    if (name === "busNumber") isValid = value.trim().length > 0;

    setFormValid((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleSave = () => {
    alert(`Settings Saved!\nSelected Role: ${formData.role}`);
  };

  const handleClose = () => navigate("/");

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        {/* <div className={styles.personalHeading}>Personal Details</div> */}
         <div className={styles.personalHeading}>Personal Details</div>
        <FaTimesCircle className={styles.closeIcon} title="Close" onClick={handleClose} />

        <div className={styles.cardBody}>
          <div className={styles.profileLeft}>
            <img
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
              onClick={handleImageClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {/* <h2 className={styles.profileName}>{formData.name}</h2> */}
          </div>

          <div className={styles.formRight}>
            <div className={styles.formRow}>
              <label>NAME</label>
              <div className={styles.inputWithIcon}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formValid.name && <FaCheckCircle className={styles.validIcon} />}
              </div>
            </div>
            <div className={styles.formRow}>
              <label>SELECT YOUR ROLE</label>
              <div className={styles.inputWithIcon}>
                <FaUserTag className={styles.inputIcon} />
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="" disabled>Driver/Admin</option>
                  <option value="Driver">Driver</option>
                  <option value="Admin">Admin</option>
                </select>
                {formValid.role && <FaCheckCircle className={styles.validIcon} />}
              </div>
            </div>
            <div className={styles.formRow}>
              <label>BUS NUMBER</label>
              <div className={styles.inputWithIcon}>
                <FaBus className={styles.inputIcon} />
                <input
                  type="text"
                  name="busNumber"
                  placeholder="Bus Number"
                  value={formData.busNumber}
                  onChange={handleChange}
                />
                {formValid.busNumber && <FaCheckCircle className={styles.validIcon} />}
              </div>
            </div>
            <div className={styles.formRow}>
              <label>EMAIL</label>
              <div className={styles.inputWithIcon}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formValid.email && <FaCheckCircle className={styles.validIcon} />}
              </div>
            </div>
            <div className={styles.formRow}>
              <label>PASSWORD</label>
              <div className={`${styles.passwordInputWrapper} ${styles.inputWithIcon}`}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formValid.password && <FaCheckCircle className={styles.validIconPassword} />}
                <span className={styles.toggleIcon} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className={styles.formRow}>
              <label>PHONE</label>
              <div className={styles.inputWithIcon}>
                <FaPhoneAlt className={styles.inputIcon} />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {formValid.phone && <FaCheckCircle className={styles.validIcon} />}
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.saveBtn} onClick={handleSave}>SAVE</button>
              <FaEdit className={styles.editIcon} onClick={() => navigate("/edit")} title="Edit Profile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
