import React from 'react';

const textbox = ({ id, placeholder, type, onChangeMethod, className, label }) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} onChange={onChangeMethod} required placeholder={placeholder}/>
    </div>
  );
}

export default textbox;