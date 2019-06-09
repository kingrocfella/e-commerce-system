import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Products from './components/products/products';
import requireAuth from './components/hocs/routeguard'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component= {requireAuth(Products)} />
            <Route path="/login" component= {SignIn} />
            <Route path="/signup" component= {SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;