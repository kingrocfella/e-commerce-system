import React from 'react';

const header = ({componentclassName, HeaderName}) => {
  return (
    <h4 className={componentclassName}>{HeaderName}</h4>
  );
}

export default header;
