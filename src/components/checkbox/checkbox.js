import React from 'react';

const CheckBox = ({ label, className = '', isGrey, ...props }) => {
  return (
    <label className={`c-checkbox ${className}`}>
      {label}
      <input type="checkbox" {...props} />
      <span className={`c-checkbox__checkmark ${isGrey ? 'c-checkbox--grey__checkmark' : ''}`} />
    </label>
  );
};
export default CheckBox;
