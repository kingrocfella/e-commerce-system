import React from "react";
import { NavLink } from "react-router-dom"

const SignOutLinks = () => {
  return (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><NavLink to="/shopmate/signup">Signup</NavLink></li>
      <li><NavLink to="/shopmate/login">Login</NavLink></li>
    </ul>
  );
}

export default SignOutLinks