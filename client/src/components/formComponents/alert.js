import React from 'react';

const header = ({componentclassName, alert}) => {
  return (
    <strong><p className={componentclassName}>{alert}</p></strong>
  );
}

export default header;
