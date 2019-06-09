import React from 'react';

const button = ({btnClassName, btnName , disabled}) => {
  return (
    <div className="input-field">
      <button className={btnClassName} disabled={disabled}>{btnName}</button>
    </div>
  );
}

export default button;

