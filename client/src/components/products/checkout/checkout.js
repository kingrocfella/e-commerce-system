import React, { Component } from 'react';
import apiService from '../../../services/apiroutes';

export default class Checkout extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    let cart_id = localStorage.getItem("cart_id");
    apiService.getProductsFromCart(cart_id)
      .then(res => {
        this.setState({ products: res.data });
      });
  }

  render() {
    let CheckoutItems = (this.state.products) ? (
      this.state.products.map(item => {
        return (
          <tr key={item.item_id}>
            <td>{item.name}</td>
            <td>{item.attributes}</td>
            <td>${item.price}</td>
            <td>{item.quantity}</td>
            <td>${item.subtotal}</td>
            <td><button className="waves-effect waves-light btn">Delete</button></td>
          </tr>
        );
      })
    ) : null
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">
                <span className="card-title center">Product Cart Checkout</span>
                <div>
                  <table className="highlight centered responsive-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Attribute</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CheckoutItems}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-action">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}