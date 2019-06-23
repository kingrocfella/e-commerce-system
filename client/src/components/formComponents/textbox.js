import React from 'react';

const textbox = ({ id, placeholder, type, onChangeMethod, className, label, value }) => {
  return (
    <div className={className}>
      {/* <label htmlFor={id}>{label}</label> */}
      <input type={type} id={id} onChange={onChangeMethod} value={value} placeholder={placeholder} required/>
    </div>
  );
}

export default textbox;