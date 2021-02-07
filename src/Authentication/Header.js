import React, { useContext } from "react";
import routes from "./Routes";
import { Link } from "react-router-dom";

import Logo from "../Logo.png";

const Header = () => {
  return (
    <div className={"header"}>
      <img className="logo" src={Logo} alt="Logo" />
      <ul className="nav">
        {routes.map((route, i) => (
          <li key={i}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
