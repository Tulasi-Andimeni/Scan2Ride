import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="nav">
        <div className="nav1">
          <div className="nav1-sub1">
            <Link to="/side">
              <i className="fa-solid fa-bars"></i>
            </Link>
          </div>
          <input
            type="text"
            placeholder="Search bar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          className="  search-bar"
          />
          {/* <div className="nav1-sub2"></div> */}
        </div>
      </div>
    </>
  );
};

export default Nav;
