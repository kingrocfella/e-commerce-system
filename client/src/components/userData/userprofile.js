import React, { Component } from 'react';
import { connect } from 'react-redux';
import Textbox from '../formComponents/textbox';
import apiService from '../../services/apiroutes';
import Alert from '../formComponents/alert';

class UserProfile extends Component {

  state = {
    name: "",
    email: "",
    day_phone: "",
    eve_phone: "",
    mob_phone: "",
    error: "",
    success: "",
    token: localStorage.getItem("token")
  }

  componentDidMount() {
    let { token } = this.state;
    apiService.getUserDetails(token)
      .then(res => {
        this.setState({
          name: res.data["name"],
          email: res.data["email"],
          day_phone: res.data["day_phone"],
          eve_phone: res.data["eve_phone"],
          mob_phone: res.data["mob_phone"]
        });
      })
      .catch(err => {
        this.setState({ error: "An error occurred while fetching your profile", success: false });
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    apiService.updateUserDetails(this.state)
      .then(res => {
        this.setState({ success: "Your profile has been succesfully updated!", error: false })
      })
      .catch(err => {
        this.setState({ error: "An error occurred while updating your profile", success: false });
      });
  }

  render() {
    let { error, success } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card">
              <div className="card-content">
                <span className="card-title center"><strong>Edit User Profile</strong></span>
                {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
                {success ? <Alert componentclassName="green-text text-darken-1 center" alert={success} /> : null}
                <form className="col s12" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field col s6">
                      <Textbox id="name" type="text" className="input-field" label="Name" onChangeMethod={this.handleChange} value={this.state.name || ''} placeholder="Name" />
                    </div>
                    <div className="input-field col s6">
                      <Textbox id="email" type="email" onChangeMethod={this.handleChange} className="input-field" label="Email" value={this.state.email || ''} placeholder="Email" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <Textbox id="day_phone" type="text" className="input-field" label="Day Phone" onChangeMethod={this.handleChange} value={this.state.day_phone || ''} placeholder="Day Phone" />
                    </div>
                    <div className="input-field col s6">
                      <Textbox id="eve_phone" type="text" onChangeMethod={this.handleChange} className="input-field" label="Eve Phone" value={this.state.eve_phone || ''} placeholder="Eve Phone" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <Textbox id="mob_phone" type="text" className="input-field" label="Mobile Phone" onChangeMethod={this.handleChange} value={this.state.mob_phone || ''} placeholder="Mob Phone" />
                    </div>
                    <div className="input-field col s6">
                      <Textbox id="password" type="password" className="input-field" label="Password" onChangeMethod={this.handleChange}  placeholder="New Password" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6 offset-s5">
                      <button className="waves-effect waves-light btn green">Save Details</button>
                    </div>
                  </div>
                </form>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(UserProfile);