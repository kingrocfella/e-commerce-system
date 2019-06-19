import React from 'react'
import Textbox from '../formComponents/textbox';
import Button from '../formComponents/buttons';
import Alert from '../formComponents/alert';

const LoginModal = ({ show, hide, handleLoginChange, handleSubmit, error }) => {
  const showModal = (show) ? 'block' : 'none';
 
  return (
    <div className="w3-modal" style={{ display: showModal }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span onClick={hide} className="w3-button w3-display-topright">&times;</span>
          <h5 className="center"><strong>Please Login to continue!</strong></h5>
          {error ? <Alert componentclassName="red-text text-darken-1 center" alert={error} /> : null}
          <form onSubmit={handleSubmit}>
            <Textbox id="email" placeholder="Enter Email" type="email" onChangeMethod={handleLoginChange} className="input-field" label="Email" />
            <Textbox id="password" placeholder="Enter Password" type="password" onChangeMethod={handleLoginChange} className="input-field" label="Password" />
            <Button btnClassName="btn btn-primary" btnName="LOGIN" />
          </form>
        </div>
        <button onClick={hide} className="w3-button w3-black w3-display-bottomright">CLOSE</button>
      </div>
    </div>
  );
}

export default LoginModal;