import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';
import Select from 'react-select';
import Alert from '../../formComponents/alert';
import Textbox from '../../formComponents/textbox';

class Orders extends Component {
  state = {
    shipping_region_details: "",
    tax_details: "",
    shipping_region_id: "",
    selected_shipping_region: "",
    cart_id: localStorage.getItem("cart_id"),
    shipping_id: "",
    token: localStorage.getItem("token"),
    error: "",
    success: "",
    credit_card:""
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
    Promise.all([
      apiService.getShippingRegionsByID(shipping_region_id),
      apiService.getAllTaxes(),
      apiService.getUserDetails(this.state.token)
    ]).then(([resShipping, resTax, resCust]) => {
      this.setState({ selected_shipping_region: resShipping.data });
      this.setState({ tax_details: resTax.data });
      this.setState({ credit_card: resCust.data["credit_card"] });
    });
  }

  handleSelectedDetailsChange = (shipping_id) => {
    this.setState({ shipping_id });
  }

  handleCreditCardChange = (e) => {
    this.setState({ credit_card: e.target.value });
  }

  handleSelectedTaxChange = tax_id => {
    let { shipping_id, cart_id, token, credit_card } = this.state;
    if(!credit_card) return this.setState({error: "Please fill in your credit card details!", success: false})
    let payload = { shipping_id, cart_id, token, tax_id }
    apiService.createNewOrder(payload)
      .then(res => {
        this.setState({ success: "Your order has been successfully created!", error: false });
      })
      .catch(err => {
        this.setState({ error: "Ooops! An error occurred. Please try again!", success: false })
      });
  }


  render() {
    let { shipping_region_details, selected_shipping_region, tax_details } = this.state;
    let formatedShippingDetails = [];
    let selectedShippingDetails = [];
    let formatedTaxDetails = [];
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

    for (let key in tax_details) {
      for (let item in tax_details[key]) {
        if (item === 'tax_type') label = tax_details[key][item];
        if (item === 'tax_id') value = tax_details[key][item];
      }
      formatedTaxDetails.push({
        label, value
      });
    }
    let { error, success } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <span className="card-title center"><strong>Create New Order</strong></span>
              {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
              {success ? 
              <div>
                <Alert componentclassName="green-text text-darken-1 center" alert={success} /> 
              </div>: null}
            </div>
          </div>
          <div className="col s3 m3">
            <p><strong>Region:</strong></p>
            <Select options={formatedShippingDetails} onChange={(opt) => { this.handleShippingDetailsChange(opt.value) }} />
          </div>
          <div className="col s3 m3">
            {(selectedShippingDetails.length > 0) ? <p><strong>Delivery Plan:</strong></p> : null}
            {(selectedShippingDetails.length > 0) ? <Select options={selectedShippingDetails} onChange={(opt) => { this.handleSelectedDetailsChange(opt.value) }} /> : null}
          </div>
          <div className="col s3 m3">
            {(formatedTaxDetails.length > 0) ? <p><strong>Credit Card:</strong></p> : null}
            {(formatedTaxDetails.length > 0) ? <Textbox id="credit_card" type="text" className="input-field" label="Credit Card" onChangeMethod={this.handleCreditCardChange} value={this.state.credit_card || ''} placeholder="Credit Card" /> : null}
          </div>
          <div className="col s3 m3">
            {(formatedTaxDetails.length > 0) ? <p><strong>Tax Plan:</strong></p> : null}
            {(formatedTaxDetails.length > 0) ? <Select options={formatedTaxDetails} onChange={(opt) => { this.handleSelectedTaxChange(opt.value) }} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Orders);