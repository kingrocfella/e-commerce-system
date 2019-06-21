import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Products from './components/products/products';
import Checkout from './components/products/checkout/checkout';
import UserProfile from './components/userData/userprofile';
import Orders from './components/products/orders/order'
import requireAuth from './components/hocs/routeguard'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/products" component= {Products} />
            <Route exact path="/login" component= {SignIn} />
            <Route path="/signup" component= {SignUp} />
            <Route exact path="/products/checkout" component= {requireAuth(Checkout)} />
            <Route exact path="/user/profile" component= {requireAuth(UserProfile)} />
            <Route exact path="/products/orders" component= {requireAuth(Orders)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
