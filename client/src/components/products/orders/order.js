import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';
import { DropdownList } from 'react-widgets';
import Alert from '../../formComponents/alert';
import Textbox from '../../formComponents/textbox';

class Orders extends Component {
  state = {
    shipping_region_details: [],
    tax_details: [],
    shipping_region_id: "",
    selected_shipping_region: [],
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
    let { error, success } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <span className="card-title center"><strong>Create New Order</strong></span>
              {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
              {success ? <Alert componentclassName="green-text text-darken-1 center" alert={success} /> : null}
            </div>
          </div>
          <div className="col s6 m6 l6">
            <p><strong>Region:</strong></p>
            <DropdownList data={shipping_region_details} valueField='shipping_region_id' textField='shipping_region' placeholder="Select Region" onChange={value => this.handleShippingDetailsChange(value.shipping_region_id)} />
          </div>
          <div className="col s6 m6 l6">
            {(selected_shipping_region.length > 0) ? <p><strong>Delivery Plan:</strong></p> : null}
            {(selected_shipping_region.length > 0) ? <DropdownList data={selected_shipping_region} valueField='shipping_region_id' textField='shipping_type' placeholder="Select Plan" onChange={value => this.handleSelectedDetailsChange(value.shipping_region_id)} /> : null}
          </div>
        </div>
        <div className="row">
        <div className="col s6 m6 l6">
            {(tax_details.length > 0) ? <p><strong>Credit Card:</strong></p> : null}
            {(tax_details.length > 0) ? <Textbox id="credit_card" type="text" className="input-field" label="Credit Card" onChangeMethod={this.handleCreditCardChange} value={this.state.credit_card || ''} placeholder="Credit Card" /> : null}
          </div>
          <div className="col s6 m6 l6">
            {(tax_details.length > 0) ? <p><strong>Tax Plan:</strong></p> : null}
            {(tax_details.length > 0) ? <DropdownList data={tax_details} valueField='tax_id' textField='tax_type' placeholder="Select Tax Plan" onChange={value => this.handleSelectedTaxChange(value.tax_id)} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Orders);