import React from 'react';
import bg from '../../../img/bg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';

const Productcard = ({ products, handleHover, hoveredItem, handleAddToCart, handleInfoClick, handleSelectColorChange, handleSelectSizeChange, getAttributes, attributesList }) => {
  let attributesSize = [];
  let attributesColor = [];
  let Color, Size;
  for (let i in attributesList) {
    if (attributesList[i]["attribute_name"] === 'Color') Color = attributesList[i]["attribute_value"];
    else if (attributesList[i]["attribute_name"] === 'Size') Size = attributesList[i]["attribute_value"];
    if (Color) {
      attributesColor.push({
        label: Color,
        value: Color
      });
      Color = "";
    }
    if (Size) {
      attributesSize.push({
        label: Size,
        value: Size
      });
    }
  }

  let DisplayProducts = (products) ? (
    products.map(product => {
      return (
        <div key={product.product_id} className={`col spacedRow s12 m4 l4${(product.product_id === hoveredItem) ? ' add-overlay' : ''}`} onMouseEnter={() => { handleHover(product.product_id) }}>
          <div className="card-image">
            <img src={bg} height="200" width="50" alt="product" />
          </div>
          <div className="row" onClick={() => { getAttributes(product.product_id) }}>
            <div className="col s6">
              <Select options={attributesColor} onChange={(opt) => { handleSelectColorChange(opt.value) }} />
            </div>
            <div className="col s6">
              <Select options={attributesSize} onChange={(opt) => { handleSelectSizeChange(opt.value) }} />
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
      <div className="card" style={{ display: 'block' }}>
        {DisplayProducts}
      </div>
    </div>
  )

}

export default Productcard;