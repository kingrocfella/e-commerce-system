import React, { Component } from 'react';
import Textbox from '../formComponents/textbox';
import Button from '../formComponents/buttons';
import FormHeader from '../formComponents/formHeader';
import Alert from '../formComponents/alert';
import { Link } from "react-router-dom";
import apiService from '../../services/apiroutes';
import { connect } from 'react-redux';
import authAction from '../../store/actions/authAction';

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    apiService.login(this.state)
      .then(res => {
        let authData = {
          name: res.data.customer.schema.name,
          email: res.data.customer.schema.email,
          customer_id: res.data.customer.schema.customer_id,
          token: res.data.accessToken
        }
        let customer_id = localStorage.getItem("customer_id");
        if(customer_id !== String(res.data.customer.schema.customer_id)){
          localStorage.removeItem("customer_id");
          localStorage.removeItem("cart_id");
          localStorage.removeItem("cart_items");
        }
        //push auth details into redux store
        this.props.setAuthData(authData);
        if (!localStorage.getItem("cart_id")) {
          //generate cart_id
          apiService.generateUniqueCartID()
            .then(res => {
              let { cart_id } = res.data;
              localStorage.setItem("cart_id", cart_id);
              //redirect to products page if logged in
              this.props.history.push("/shopmate/products");
            })
        } else{
          this.props.history.push("/shopmate/products");
        }
      })
      .catch(err => {
        this.setState({
          error: err.response && err.response.data.error.message
        })
        console.log(err.response.data.error.message);
      });
  }

  render() {
    let { error } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s2"></div>
          <div className="col s8">
            <form onSubmit={this.handleSubmit} className="white">
              {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
              <FormHeader componentclassName="grey-text text-darken-3 center" HeaderName="LOGIN" />
              <Textbox id="email"  type="email" onChangeMethod={this.handleChange} className="input-field" label="Email" placeholder="Email"/>
              <Textbox id="password" type="password" onChangeMethod={this.handleChange} className="input-field" label="Password" placeholder="Password" />
              <div className="center-align">
                <Button btnClassName="btn btn-primary" btnName="LOGIN" disabled={!this.state.email || !this.state.password} />
                <p>Not a registered user?  <Link to="/shopmate/signup"><strong>Sign Up</strong></Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authData: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  setAuthData: (authData) => dispatch(authAction(authData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
