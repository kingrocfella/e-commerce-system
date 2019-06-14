import React from 'react';
import bg from '../../../img/bg.jpg'

const Productcard = ({ products, handleHover }) => {
  let DisplayProducts = (products) ? (
    products.map(product => {
      return (
        <div key={product.product_id} className="col s4" onMouseEnter={() => {handleHover(product.product_id)}} >
          <div className="card-image">
            <img src={bg} height="200" width="50" alt="product" />
          </div>
          <div className="card-content">
            <span className="card-title">{product.name}</span>
            <div>{product.description}</div>
          </div>
        </div>
      );
    })
  ) : null

  return (
    <div>
      <div className="card" style={{display: 'block'}}>
        {DisplayProducts}
      </div>
    </div>
  )

}

export default Productcard;