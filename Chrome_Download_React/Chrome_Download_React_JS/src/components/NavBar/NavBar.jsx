import React from "react";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
const NavBar = () => {
  return (
    <nav className="nav-container">
      <div className="logo">
        <i className="fa-brands fa-chrome" style={{ fontSize: "24px"}}></i>
        <h4 style={{ color: "#fff", margin: "2px 48px", fontSize:'22px' }}>Downloads</h4>
      </div>
      <div className="search-box">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          className="search-input "
          placeholder="Search downloads"
        />
      </div>
    </nav>
  );
};
export default NavBar;