import React, { Component } from 'react'
import apiService from '../../../services/apiroutes';
import Alert from '../../formComponents/alert';
import Moment from 'react-moment';
import OrderDetailModal from '../../modals/orderDetailModal';
import ErrorModal from '../../modals/errorModal';

export default class orderHistory extends Component {
  state = {
    token: localStorage.getItem("token"),
    orders: [],
    error: "",
    success: localStorage.getItem("orderPaid"),
    showModal: false,
    orderDetail: [],
    showErrorModal: false
  }

  componentDidMount() {
    let { token, success } = this.state;
    if (success) this.setState({ success: "Your payment was successful." }, () => { localStorage.removeItem("orderPaid") });
    apiService.getCustomerOrders(token)
      .then(res => {
        this.setState({ orders: res.data });
        localStorage.removeItem("cart_id");
      })
      .catch(err => {
        this.setState({ error: "Ooops! An error occurred while fetching your orders", success: false });
      });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  closeError = () => {
    this.setState({showErrorModal: false});
  }

  handleOrderDetail = (order_id) => {
    let { token } = this.state;
    apiService.getOrderDetail(order_id, token)
      .then(res => {
        if(res.data.length > 0) this.setState({ orderDetail: res.data, showModal: true });
        else this.setState({ showErrorModal: "This order has no detail to be displayed!" });
      })
      .catch(err => {
        this.setState({ error: "Ooops! An error occurred while getting the order detail", success: false });
      });
  }

  render() {
    let { orders, error, success, showModal, orderDetail, showErrorModal } = this.state;
    let ordersList = (orders) ? (
      orders.map(item => {
        return (
          <tr key={item.order_id}>
            <td>{item.name}</td>
            <td><Moment fromNow date={item.created_on} /></td>
            <td>{(item.shipped_on) ? item.shipped_on : "-"}</td>
            <td>{(item.status === 0) ? "Pending Delivery" : "Delivered"}</td>
            <td>${item.total_amount}</td>
            <td><button className="waves-effect waves btn-small green" onClick={() => { this.handleOrderDetail(item.order_id) }}>VIEW DETAILS</button></td>
          </tr>
        );
      })
    ) : null
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <OrderDetailModal detail={orderDetail} show={showModal} hide={this.hideModal} />
              <ErrorModal error={showErrorModal} hide={this.closeError} />
              <div className="card-content">
                {(orders.length > 0) ? <span className="card-title center">Your Orders History</span> : null}
                {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
                {success ? <Alert componentclassName="green-text text-darken-1 center" alert={success} /> : null}
                <div>
                  {
                    (orders.length > 0) ?
                      <table className="striped centered responsive-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Time of Order</th>
                            <th>Shipping Date</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordersList}
                        </tbody>
                      </table> :
                      <p className="center"><strong>You have no orders!</strong></p>
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
