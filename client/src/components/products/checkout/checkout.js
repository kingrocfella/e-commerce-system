import React, { Component } from 'react';
import apiService from '../../../services/apiroutes';
import addtocartAction from '../../../store/actions/addtocartAction';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Alert from '../../formComponents/alert';

class Checkout extends Component {
  state = {
    products: [],
    error: "",
    totalAmount: "",
    quantity: "",
    token: localStorage.getItem("token"),
    success: false,
    item_id: "",
    cart_id: localStorage.getItem("cart_id")
  }

  componentDidMount() {
    let { cart_id } = this.state;
    this.getProducts(cart_id);
  }

  componentDidUpdate(prevProps) {
    let prevCount;
    let { cart_id } = this.state;
    for (let key in prevProps) {
      if (key === 'getcartitem') prevCount = prevProps[key]['addtocart'];
    }
    let { addtocart } = this.props.getcartitem;
    if (addtocart !== prevCount) {
      this.getProducts(cart_id);
    }
  }

  getProducts = (cart_id) => {
    Promise.all([
      apiService.getProductsFromCart(cart_id),
      apiService.getTotalAmount(cart_id)
    ]).then(([resProd, resTotal]) => {
      this.setState({
        products: resProd.data,
        totalAmount: resTotal.data[0]["total_amount"]
      });
    })
    apiService.getProductsFromCart(cart_id)
      .then(res => {
        this.setState({ products: res.data });
      });
  }

  deleteProduct = (item_id) => {
    apiService.deleteProductFromCart(item_id)
      .then(res => {
        //reduce items number by 1
        let { addtocart } = this.props.getcartitem;
        if (!addtocart) addtocart = localStorage.getItem("cart_items");
        let itemsCount = addtocart - 1
        this.props.addtocart(String(itemsCount));
      })
      .catch(err => {
        this.setState({ error: "An error occurred while removing item." })
      });
  }

  reduceQuantity = (quantity, item_id) => {
    if (quantity === 1) return;
    quantity--;
    this.setState({ quantity, item_id });
  }

  increaseQuantity = (quantity, item_id) => {
    quantity++;
    this.setState({ quantity, item_id });
  }

  updateQuantity = (item_id) => {
    let { token, quantity, cart_id } = this.state;
    apiService.updateCart(item_id, quantity, token)
      .then(res => {
        this.getProducts(cart_id);
        this.setState({ success: "Cart successfully updated!", error: false })
      })
      .catch(err => {
        this.setState({ error: "An error occurred while updating cart!", success: false })
      })
  }

  render() {
    let { error, success } = this.state;
    let CheckoutItems = (this.state.products) ? (
      this.state.products.map(item => {
        return (
          <tr key={item.item_id}>
            <td>{item.name}</td>
            <td>{item.attributes}</td>
            <td>${item.price}</td>
            <td>{(item.item_id === this.state.item_id && this.state.quantity) ? (this.state.quantity) : item.quantity}</td>
            <td><button className="btn-floating btn-small waves-effect waves red" onClick={() => { this.reduceQuantity(this.state.quantity || item.quantity, item.item_id) }}>-</button> &nbsp; <button className="btn-floating btn-small waves-effect waves green" onClick={() => { this.increaseQuantity(this.state.quantity || item.quantity, item.item_id) }}>+</button></td>
            <td>${item.subtotal}</td>
            <td><button className="waves-effect waves btn-small green" onClick={() => { this.updateQuantity(item.item_id) }}>UPDATE</button></td>
            <td><button className="waves-effect waves btn-small red" onClick={() => { this.deleteProduct(item.item_id) }}>REMOVE</button></td>
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
                {(CheckoutItems.length > 0) ? <span className="card-title center">Product Cart Checkout</span> : null}
                {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
                {success ? <Alert componentclassName="green-text text-darken-1 center" alert={success} /> : null}
                <div>
                  {
                    (CheckoutItems.length > 0) ?
                      <table className="striped centered responsive-table">
                        <thead>
                          <tr>
                            <th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                            <th><Link to="/shopmate/products/orders" className="waves-effect waves-light btn green">PROCEED</Link></th>
                          </tr>
                          <tr>
                            <th>Name</th>
                            <th>Attribute</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Update Quantity</th>
                            <th>Subtotal</th>
                            <th>Update Cart</th>
                            <th>Remove Item</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CheckoutItems}
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th><th></th>
                            <th><strong>Total Amount</strong></th>
                            <th>${this.state.totalAmount}</th>
                          </tr>
                          <tr>
                            <th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                            <th><Link to="/shopmate/products"><i>Continue Shopping?</i></Link></th>
                          </tr>
                        </tbody>
                      </table> :
                      <p className="center"><strong>You have no items in your cart!</strong></p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getcartitem: state.addtocart
});

const mapDispatchToProps = (dispatch) => ({
  addtocart: (product_id) => dispatch(addtocartAction(product_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);