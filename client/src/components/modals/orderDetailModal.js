import React from 'react'

const OrderDetailModal = ({ detail, show, hide }) => {
  const showModal = (show) ? 'block' : 'none';
  let name, attributes, quantity,subtotal;
  // console.log(detail)
  for (let key in detail[0]) {
    if (key === 'product_name') name = detail[0][key]
    if (key === 'attributes') attributes = detail[0][key]
    if (key === 'quantity') quantity = detail[0][key]
    if (key === 'subtotal') subtotal = detail[0][key]
  }
  return (
    <div className="w3-modal" style={{ display: showModal }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span onClick={hide} className="w3-button w3-display-topright">&times;</span>
          <h5 className="center"><strong>Order Details</strong></h5>
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
                <td><strong>Product Name</strong></td>
                <td></td>
                <td>{name}</td>
              </tr>
              <tr>
                <td><strong>Attributes</strong></td>
                <td></td>
                <td>{attributes}</td>
              </tr>
              <tr>
                <td><strong>Quantity</strong></td>
                <td></td>
                <td>{quantity}</td>
              </tr>
              <tr>
                <td><strong>Total Cost</strong></td>
                <td></td>
                <td>${subtotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={hide} className="w3-button w3-black w3-display-bottomright">CLOSE</button>
      </div>
    </div>
  );
}

export default OrderDetailModal;