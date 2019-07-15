import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../../../services/apiroutes';
import { DropdownList } from 'react-widgets';
import Alert from '../../formComponents/alert';
import CreditCard from './creditCard';
import addtocartAction from '../../../store/actions/addtocartAction';

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
    credit_card: "",
    cvc: "",
    exp_month: "",
    exp_year: "",
    totalAmount: "",
    order_id: "",
    stripeToken: "",
    loading: false
  }

  componentDidMount() {
    let { cart_id } = this.state;
    Promise.all([
      apiService.getShippingRegions(),
      apiService.getTotalAmount(cart_id)
    ]).then(([resShip, resTotal]) => {
      this.setState({
        shipping_region_details: resShip.data,
        totalAmount: resTotal.data[0]["total_amount"]
      });
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
    })
      .catch(err => {
        console.log(err);
      })
  }

  handleSelectedDetailsChange = (shipping_id) => {
    this.setState({ shipping_id });
  }

  handleCreditCardChange = (e) => {
    this.setState({ credit_card: e.target.value });
  }

  handleSelectedTaxChange = tax_id => {
    let { shipping_id, cart_id, token } = this.state;
    let payload = { shipping_id, cart_id, token, tax_id }
    apiService.createNewOrder(payload)
      .then(res => {
        this.setState({ error: false, order_id: res.data.orderId });
      })
      .catch(err => {
        this.setState({ error: "Ooops! An error occurred. Please try again!", success: false })
      });
  }

  handleCVCChange = e => {
    this.setState({ cvc: e.target.value, loading: true });
  }

  handleExpYearChange = e => {
    this.setState({ exp_year: e.target.value });
  }

  handleExpMonthChange = e => {
    this.setState({ exp_month: e.target.value });
  }

  getStripeToken = () => {
    this.setState({loading: false});
    let { credit_card, exp_month, exp_year, cvc } = this.state;
    let payload = {
      number: credit_card,
      exp_month, exp_year, cvc
    }
    //get stripe token
    apiService.stripeToken(payload)
      .then(res => {
        this.setState({ stripeToken: res.data }, () => { this.sendCharge() });
      })
      .catch(err => {
        this.setState({ error: "Ooops! An error occurred. Please try again!", success: false, loading: true });
      });
  }

  sendCharge() {
    let { cart_id, order_id, totalAmount, stripeToken } = this.state;
    let payload = {
      currency: `usd`,
      amount: totalAmount,
      description: `Stripe payment`,
      stripeToken,
      order_id
    }
    //send charge
    apiService.stripeCharge(payload)
      .then(res => {
        let { status } = res.data;
        if (status === "succeeded") {
          this.setState({ success: "Your payment was successful!", error: false },
            () => {
              localStorage.setItem("orderPaid", order_id);
              apiService.deleteCart(cart_id)
                .then(res => {
                  localStorage.setItem("cart_items", 0);
                  localStorage.removeItem("order_id");
                  this.props.addtocart(0);
                  //redirect to orders history page
                  this.props.history.push("/shopmate/orders/history");
                });
            });
        } else this.setState({ error: "Ooops! An error occurred. Please try again!", success: false });
      })
      .catch(err => {
        this.setState({ error: "Ooops! An error occurred. Please try again!", success: false });
      });
  }

  render() {
    let { shipping_region_details, selected_shipping_region, tax_details, error, success, credit_card, cvc, exp_month, exp_year, totalAmount, loading } = this.state;
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
            {(tax_details.length > 0) ? <p><strong>Tax Plan:</strong></p> : null}
            {(tax_details.length > 0) ? <DropdownList data={tax_details} valueField='tax_id' textField='tax_type' placeholder="Select Tax Plan" onChange={value => this.handleSelectedTaxChange(value.tax_id)} /> : null}
          </div>
        </div>
        {(tax_details.length > 0) ?
          <CreditCard credit_card={credit_card} handleCreditCardChange={this.handleCreditCardChange} handleExpMonthChange={this.handleExpMonthChange} handleExpYearChange={this.handleExpYearChange} handleCVCChange={this.handleCVCChange} exp_month={exp_month} exp_year={exp_year} cvc={cvc} totalAmount={totalAmount} getStripeToken={this.getStripeToken} loading={loading}/> : null
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addtocart: (product_id) => dispatch(addtocartAction(product_id))
});

export default connect(null, mapDispatchToProps)(Orders);