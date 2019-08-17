import React from 'react'
import { Link } from "react-router-dom";


function PrivateNav(props) {
  return (
    <ul>
      <li>
        <Link to="/">Todo</Link>
      </li>
      <li onClick={() => props.toggleAuth()}>
        Sair
      </li>
    </ul>
  )
}

export default PrivateNav;
