import React from 'react';
import bg from '../../../img/bg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'


const Productcard = ({ products, handleHover, hoveredItem, handleAddToCart }) => {
  let DisplayProducts = (products) ? (
    products.map(product => {
      return (
        <div key={product.product_id} className={`col s4${(product.product_id === hoveredItem) ? ' add-overlay' : ''}`} onMouseEnter={() => { handleHover(product.product_id) }}>
          <div className="card-image">
            <img src={bg} height="200" width="50" alt="product" />
          </div>
          <div className="card-content">
            <span className="card-title">{product.name}</span>
            <div>{product.description}</div><br/>
            {
              (product.product_id === hoveredItem) 
              ? <button className="styledButton" style={{marginLeft: `70%`}} onClick={() => {handleAddToCart(product.product_id)}}>
                <FontAwesomeIcon icon={faCartPlus} />
              </button> 
              :  <button className="emptyButton" style={{marginLeft: `70%`}}><FontAwesomeIcon icon={faCartPlus} /></button>
              }
          </div>
        </div>
      );
    })
  ) : null

  return (
    <div>
      <div className="card" style={{ display: 'block' }}>
        {DisplayProducts}
      </div>
    </div>
  )

}

export default Productcard;