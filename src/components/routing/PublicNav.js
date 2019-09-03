import React from "react";
import { NavLink } from "react-router-dom";

function PublicNav() {
  return (
    <ul>
      <li>
        <NavLink to="/login/" activeClassName="selectedLink">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup/" activeClassName="selectedLink">
          Signup
        </NavLink>
      </li>
    </ul>
  );
}

export default PublicNav;
