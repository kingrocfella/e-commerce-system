import React from 'react';
import Textbox from '../../formComponents/textbox';

const CreditCard = ({ credit_card, handleCreditCardChange, handleExpMonthChange, handleExpYearChange, handleCVCChange, cvc, exp_year, exp_month, totalAmount, getStripeToken, loading }) => {
  return (
    <div>
      <div className="row">
        <p><strong>Credit Card Details</strong></p>
        <div className="col s6 m6 l6">
          <p><strong>Credit Card:</strong></p>
          <Textbox id="credit_card" type="text" className="input-field" label="Credit Card" onChangeMethod={handleCreditCardChange} value={credit_card || ''} placeholder="Credit Card" />
        </div>
        <div className="col s3 m3 l3">
          <p><strong>Expiry Month:</strong></p>
          <Textbox id="exp_month" type="text" className="input-field" label="Exp month" onChangeMethod={handleExpMonthChange} value={exp_month || ''} placeholder="Expiry Month" />
        </div>
        <div className="col s3 m3 l3">
          <p><strong>Expiry Year:</strong></p>
          <Textbox id="exp_year" type="text" className="input-field" label="Exp Year" onChangeMethod={handleExpYearChange} value={exp_year || ''} placeholder="Expiry Year" />
        </div>
      </div>
      <div className="row">
        <div className="col s3 m3 l3">
          <p><strong>CVC:</strong></p>
          <Textbox id="cvc" type="text" className="input-field" label="CVC" onChangeMethod={handleCVCChange} value={cvc || ''} placeholder="CVC" />
        </div>
      </div>
      <div className="row">
        <div className="col s6 l6 m6"></div>
        <div className="col s3 m3 l3">
          <button className="waves-effect waves-light btn green" onClick={getStripeToken} disabled={!(cvc && exp_month && exp_year && credit_card && loading)}>PAY ${totalAmount}</button>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;