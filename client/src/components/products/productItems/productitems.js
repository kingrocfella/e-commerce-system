import React, { Component } from 'react';
import bg from '../../../img/bg.jpg'

class ProductItems extends Component {

  render() {
    return (
      <div>
        <div className="col s4">
          <div className="card">
            <div className="card-image">
              <img src={bg} height="200" width="50" alt="product" />
            </div>
            <div className="card-content">
              <span className="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
        <div className="col s4">
          <div className="card">
            <div className="card-image">
              <img src={bg} height="200" width="50" alt="product" />
            </div>
            <div className="card-content">
              <span className="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
        <div className="col s4">
          <div className="card">
            <div className="card-image">
              <img src={bg} height="200" width="50" alt="product" />
            </div>
            <div className="card-content">
              <span className="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductItems;