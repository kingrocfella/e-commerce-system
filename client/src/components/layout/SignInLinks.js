import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import removeState from '../../store/removeState'
import { FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux';


class SignedInLinks extends Component {
  handleClick = () => {
    removeState();
    this.props.history.push("/login");
  }

  render() {
    let { addtocart } = this.props.addtocart
    if(!addtocart) addtocart = localStorage.getItem("cart_items");
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/products/checkout"><FaShoppingCart /><span className="badgeNum">{addtocart}</span></NavLink></li>
        <li><NavLink to="/login" onClick={this.handleClick}>Log Out</NavLink></li>
        {/* <li><NavLink to="/" className="btn btn-floating black">KK</NavLink></li> */}
      </ul>
    );
  }

}

const mapStateToProps = (state) => ({
  addtocart: state.addtocart
});

export default connect(mapStateToProps)(SignedInLinks);