import React, { useState } from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";

const Navbar = ({
  isAuthenticated,
  handleLogin,
  handleLogout,
  userId,
  login,
}) => {
  return (
    <nav>
      <ul className={style.navList}>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/registrationform"></Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <>
            <li>
              <Link to="/systemtable">System Table</Link>
            </li>
            <li>
              <Link to={`/profile/${userId}`}>Profile</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
