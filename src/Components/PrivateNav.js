import React from 'react'
import { Link } from "react-router-dom";


function PrivateNav(props) {
  return (
    <ul>
      <li>
        <Link to="/">Todo</Link>
      </li>
      <li id="logoutLi" onClick={() => props.submitLogout()}>
        Logout
      </li>
    </ul>
  )
}

export default PrivateNav;
