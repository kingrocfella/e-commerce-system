import React, {Component} from "react";
import { NavLink } from "react-router-dom"
import removeState from '../../store/removeState'

class SignedInLinks extends Component {
  handleClick = () => {
    removeState();
    this.props.history.push("/login");
  }

  render() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/login" onClick={this.handleClick}>Log Out</NavLink></li>
        {/* <li><NavLink to="/" className="btn btn-floating black">KK</NavLink></li> */}
      </ul>
    );
  }
  
}


export default SignedInLinks