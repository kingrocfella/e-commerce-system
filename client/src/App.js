import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Products from './components/products/products';
import Checkout from './components/products/checkout/checkout';
import UserProfile from './components/userData/userprofile';
import Orders from './components/products/orders/order';
import OrdersHistory from './components/products/orders/orderHistory';
import requireAuth from './components/hocs/routeguard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/shopmate/products" component= {Products} />
            <Route exact path="/shopmate/login" component= {SignIn} />
            <Route path="/shopmate/signup" component= {SignUp} />
            <Route exact path="/shopmate/products/checkout" component= {requireAuth(Checkout)} />
            <Route exact path="/shopmate/user/profile" component= {requireAuth(UserProfile)} />
            <Route exact path="/shopmate/products/orders" component= {requireAuth(Orders)} />
            <Route exact path="/shopmate/orders/history" component= {requireAuth(OrdersHistory)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
