import React, { Component } from "react";
import { Link } from "react-router-dom"
import SignInLinks from './SignInLinks'
import SignOutLinks from './SignOutLinks'
import { connect } from 'react-redux';
import M from 'materialize-css';

class Navbar extends Component {
  
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    const Links = (this.props.authData.isUserLoggedIn) ? <SignInLinks /> : <SignOutLinks />

    return (
      <nav>
        <div className="nav-wrapper container topnav">
          <Link to="/shopmate/products" className="brand-logo">SHOPMATE</Link>
          {Links}
        </div>
      </nav>
    );
  }

}

const mapStateToProps = (state) => ({
  authData: state.auth
});

export default connect(mapStateToProps)(Navbar)