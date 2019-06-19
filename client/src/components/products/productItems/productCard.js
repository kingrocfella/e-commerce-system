import React from 'react';
import bg from '../../../img/bg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';

const Productcard = ({ products, handleHover, hoveredItem, handleAddToCart, handleInfoClick, handleSelectNameChange, handleSelectValueChange, getAttributes, attributesList }) => {
  let attributesName = [{label: 'Color', value: 'Color'}, {label: 'Size', value: 'Size'}];
  let attributesValue = [];
  for(let i in attributesList){
    for(let key in attributesList[i]){
      if(key === 'attribute_value'){
        attributesValue.push({
          label: `${attributesList[i][key]}`,
          value: attributesList[i][key]
        });
      }
    }
  }

  let DisplayProducts = (products) ? (
    products.map(product => {
      return (
        <div key={product.product_id} className={`col spacedRow s4${(product.product_id === hoveredItem) ? ' add-overlay' : ''}`} onMouseEnter={() => { handleHover(product.product_id); getAttributes(product.product_id) }}>
          <div className="card-image">
            <img src={bg} height="200" width="50" alt="product" />
          </div>
          <div className="row">
            <div className="col s6">
              <Select options={attributesName} onChange={(opt) => {handleSelectNameChange(opt.value)}} />
            </div>
            <div className="col s6">
              <Select options={attributesValue} onChange={(opt) => {handleSelectValueChange(opt.value)}} />
            </div>
          </div>
          <div className="card-content">
            <span className="card-title">{product.name}</span>
            <div>{product.description}</div><br />
            {
              (product.product_id === hoveredItem)
                ? <div>
                  <FontAwesomeIcon icon={faInfoCircle} onClick={() => { handleInfoClick(product.product_id) }} title="Click to view details" />
                  <button className="styledButton" style={{ marginLeft: `70%` }} onClick={() => { handleAddToCart(product.product_id) }}>
                    <FontAwesomeIcon icon={faCartPlus} />
                  </button>
                </div>
                : <button className="emptyButton" style={{ marginLeft: `70%` }}><FontAwesomeIcon icon={faCartPlus} /></button>
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