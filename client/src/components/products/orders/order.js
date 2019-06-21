import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';
import Select from 'react-select';

class Orders extends Component {
  state = {
    shipping_region_details: "",
    tax_details: "",
    shipping_region_id: "",
    selected_shipping_region: ""
  }

  componentDidMount() {
    apiService.getShippingRegions()
      .then(res => {
        this.setState({ shipping_region_details: res.data });
      })
  }

  handleChange = e => {
    this.setState({ shipping_region_id: e.target.value });
  }

  handleShippingDetailsChange = shipping_region_id => {
    apiService.getShippingRegionsByID(shipping_region_id)
      .then(res => {
        this.setState({ selected_shipping_region: res.data });
      })
  }

  handleSelectedDetailsChange = (selected_id) => {
    console.log(selected_id)
  }

  render() {
    let { shipping_region_details, selected_shipping_region } = this.state;
    let formatedShippingDetails = [];
    let selectedShippingDetails = [];
    let label, value;

    for (let key in shipping_region_details) {
      for (let item in shipping_region_details[key]) {
        if (item === 'shipping_region') label = shipping_region_details[key][item];
        if (item === 'shipping_region_id') value = shipping_region_details[key][item];
      }
      formatedShippingDetails.push({
        label, value
      });
    }

    for (let key in selected_shipping_region) {
      for (let item in selected_shipping_region[key]) {
        if (item === 'shipping_type') label = selected_shipping_region[key][item];
        if (item === 'shipping_id') value = selected_shipping_region[key][item];
      }
      selectedShippingDetails.push({
        label, value
      });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <span className="card-title center"><strong>Edit User Profile</strong></span>
            </div>
          </div>
          <div className="col s6 m6">
            <Select options={formatedShippingDetails} onChange={(opt) => { this.handleShippingDetailsChange(opt.value) }} />
          </div>
          <div className="col s6 m6">
            <Select options={selectedShippingDetails} onChange={(opt) => { this.handleSelectedDetailsChange(opt.value) }} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Orders);