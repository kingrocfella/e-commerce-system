import React from 'react'

const ProductDetailModal = ({ detail, show, hide }) => {
  const showModal = (show) ? 'block' : 'none';
  let name, description, price;
  for (let key in detail[0]) {
    if (key === 'name') name = detail[0][key]
    if (key === 'description') description = detail[0][key]
    if (key === 'price') price = detail[0][key]
  }
  return (
    <div className="w3-modal" style={{ display: showModal }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span onClick={hide} className="w3-button w3-display-topright">&times;</span>
          <h5 className="center"><strong>Product Details</strong></h5>
          <table className="responsive-table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td></td>
                <td>{name}</td>
              </tr>
              <tr>
                <td><strong>Description</strong></td>
                <td></td>
                <td>{description}</td>
              </tr>
              <tr>
                <td><strong>Price</strong></td>
                <td></td>
                <td>{price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={hide} className="w3-button w3-black w3-display-bottomright">CLOSE</button>
      </div>
    </div>
  );
}

export default ProductDetailModal;