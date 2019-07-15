import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { DropdownList } from 'react-widgets'

const Productcard = ({ products, handleHover, hoveredItem, handleAddToCart, handleInfoClick, handleSelectColorChange, handleSelectSizeChange, getAttributes, attributesList }) => {
  const Color = attributesList.filter(attr => attr.attribute_name === "Color").map(item => item.attribute_value);
  const Size = attributesList.filter(attr => attr.attribute_name === "Size").map(item => item.attribute_value);


  let DisplayProducts = (products) ? (
    products.map(product => {
      return (
        <div key={product.product_id} className={`col card spacedRow s12 m4 l4${(product.product_id === hoveredItem) ? ' add-overlay' : ''}`} onMouseEnter={() => { handleHover(product.product_id) }} >
          <div className="center">
            <img src={`http://35.176.170.254/shopmate/img/${product.thumbnail}`} height="150" width="200" alt="product" />
          </div>
          <div className="row" onMouseEnter={() => { getAttributes(product.product_id) }}>
            <div className="col s6 m6 l6">
              <DropdownList className="color" data={Color} placeholder="Color"  onChange={value => handleSelectColorChange(value)} />
            </div>
            <div className="col s6 m6 l6 size">
              <DropdownList className="size" data={Size} placeholder="Size" onChange={value => handleSelectSizeChange(value)} />
            </div>
          </div>
          <span className="card-title">{product.name}</span>
          <div>{product.description}</div><br />
          {
            (product.product_id === hoveredItem)
              ? <div>
                <FontAwesomeIcon icon={faInfoCircle} onClick={() => { handleInfoClick(product.product_id) }} title="Click to view details" />
                <button className="styledButton" style={{ marginLeft: `70%` }} onClick={() => { handleAddToCart(product.product_id) }}>
                  <FontAwesomeIcon icon={faCartPlus} title="Add to cart" />
                </button>
              </div>
              : <button className="emptyButton" style={{ marginLeft: `70%` }}><FontAwesomeIcon icon={faCartPlus} /></button>
          }
        </div>
      );
    })
  ) : null

  return (
    <div>
      <div style={{ display: 'block' }}>
        {DisplayProducts}
      </div>
    </div>
  )

}

export default Productcard;