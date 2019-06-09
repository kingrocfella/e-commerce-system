import React from "react";
import { NavLink } from "react-router-dom"

const SignOutLinks = () => {
  return (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><NavLink to="/signup">Signup</NavLink></li>
    </ul>
  );
}

export default SignOutLinks