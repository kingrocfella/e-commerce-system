import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import removeState from '../../store/removeState'
import { FaShoppingCart, FaAngleDown } from 'react-icons/fa';
import { connect } from 'react-redux';
import M from 'materialize-css';

class SignedInLinks extends Component {

  componentDidMount(){
    M.AutoInit();
  }

  handleClick = () => {
    removeState();
    this.props.history.push("/login");
  }

  render() {
    let { addtocart } = this.props.addtocart
    if (!addtocart) addtocart = localStorage.getItem("cart_items");
    let name = localStorage.getItem("name");
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/products/checkout"><FaShoppingCart /><span className="badgeNum">{addtocart}</span></NavLink></li>
        <li><NavLink to="/login" onClick={this.handleClick}>Log Out</NavLink></li>
        <li><div data-target='dropdown1' className='dropdown-trigger'>{name} <FaAngleDown /></div></li>
        <ul id='dropdown1' className='dropdown-content'>
          <li><p className="center">Profile</p></li>
          <li className="divider" tabIndex="-1"></li>
          <li><NavLink to="/user/profile">View/Edit Profile</NavLink></li>
        </ul>
      </ul>
    );
  }

}

const mapStateToProps = (state) => ({
  addtocart: state.addtocart
});

export default connect(mapStateToProps)(SignedInLinks);