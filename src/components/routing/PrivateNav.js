import React from "react";
import { NavLink } from "react-router-dom";

function PrivateNav({ handleLogout }) {
  return (
    <ul>
      <li>
        <NavLink to="/" activeClassName="selectedLink">
          Todo
        </NavLink>
      </li>
      <li id="logoutLi" onClick={handleLogout}>
        <a href="/" onClick={event => event.preventDefault()}>
          Logout
        </a>
      </li>
    </ul>
  );
}

export default PrivateNav;
