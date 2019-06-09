import React, { Component } from 'react';
import Textbox from '../formComponents/textbox';
import Button from '../formComponents/buttons';
import FormHeader from '../formComponents/formHeader';
import Alert from '../formComponents/alert';
import { Link, Redirect } from "react-router-dom";
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
        //push auth details into redux store
        this.props.setAuthData(authData);
        //redirect to products page if logged in
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          error: err.response && err.response.data.error.message
        })
        console.log(err.response.data.error.message);
      });
  }

  render() {
    if (this.props.authData.isUserLoggedIn) return  <Redirect to="/"/>
    let { error } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s2"></div>
          <div className="col s8">
            <form onSubmit={this.handleSubmit} className="white">
              {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
              <FormHeader componentclassName="grey-text text-darken-3 center" HeaderName="LOGIN" />
              <Textbox id="email" placeholder="Enter Email" type="email" onChangeMethod={this.handleChange} className="input-field" label="Email" />
              <Textbox id="password" placeholder="Enter password" type="password" onChangeMethod={this.handleChange} className="input-field" label="Password" />
              <div className="center-align">
                <Button btnClassName="btn btn-primary" btnName="LOGIN" disabled={!this.state.email || !this.state.password} />
                <p>Not a registered user?  <Link to="/signup"><strong>Sign Up</strong></Link></p>
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
