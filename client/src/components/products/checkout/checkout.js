import React, { Component } from 'react';
import apiService from '../../../services/apiroutes';
import addtocartAction from '../../../store/actions/addtocartAction';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Checkout extends Component {
  state = {
    products: [],
    error: "",
    totalAmount: ""
  }

  componentDidMount() {
    let cart_id = localStorage.getItem("cart_id");
    this.getProducts(cart_id);
  }

  componentDidUpdate(prevProps) {
    let prevCount;
    let cart_id = localStorage.getItem("cart_id");
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
        this.setState({ error: "An error ocurred while removing item." })
      });
  }



  render() {
    let { error } = this.state;
    let CheckoutItems = (this.state.products) ? (
      this.state.products.map(item => {
        return (
          <tr key={item.item_id}>
            <td>{item.name}</td>
            <td>{item.attributes}</td>
            <td>${item.price}</td>
            <td>{item.quantity}</td>
            <td>${item.subtotal}</td>
            <td><button className="waves-effect waves-light btn red" onClick={() => { this.deleteProduct(item.item_id) }}>REMOVE</button></td>
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
                {(error) ? <span style={{ color: 'red' }}>{error}</span> : null}
                <div>
                  {
                    (CheckoutItems.length > 0) ?
                      <table className="highlight centered responsive-table">
                        <thead>
                          <tr>
                            <th></th><th></th><th></th><th></th><th></th>
                            <th><Link to="/products/orders" className="waves-effect waves-light btn green">PROCEED TO ORDER</Link></th>
                          </tr>
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
                          <tr>
                            <th></th>
                            <th></th>
                            <th><strong>Total Amount</strong></th>
                            <th>${this.state.totalAmount}</th>
                            <th></th>
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