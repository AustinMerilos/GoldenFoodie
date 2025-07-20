import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import Logo from "../Logo.png";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={Logo} alt="Logo" />
      <ul className="nav">
        <li>
          <Link to="/">SignUp</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
