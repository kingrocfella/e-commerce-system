import React from "react";
import { Link } from "react-router-dom"
import SignInLinks from './SignInLinks'
import SignOutLinks from './SignOutLinks'
import { connect } from 'react-redux';

const Navbar = (props) => {
  const Links = (props.authData.isUserLoggedIn) ? <SignInLinks /> : <SignOutLinks />
  return (
    <nav>
      <div className="nav-wrapper container">
        <Link to="/products" className="brand-logo">SHOPMATE</Link>
        {Links}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  authData: state.auth
});

export default connect(mapStateToProps)(Navbar)