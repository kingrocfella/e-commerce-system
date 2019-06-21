import React from 'react'
import Alert from '../formComponents/alert';

const errorModal = ({ error, hide }) => {
  const showModal = (error) ? 'block' : 'none';
  return (
    <div className="w3-modal" style={{ display: showModal }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span onClick={hide} className="w3-button w3-display-topright">&times;</span>
          {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
        </div>
        <button onClick={hide} className="w3-button w3-black w3-display-bottomright">CLOSE</button>
      </div>
    </div>
  );
}

export default errorModal;