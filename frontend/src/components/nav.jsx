


import React from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  return (
    <div className="nav">
      <div className="nav1">
        <div className="nav1-sub1"></div>
        {/* <div className="profile-icon-container">profile
        </div> */}
      </div>
    </div>
  );
};

export default Nav;
