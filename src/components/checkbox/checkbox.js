import React from 'react';

const CheckBox = ({ label, className = '', ...props }) => {
  return (
    <label className={`c-checkbox ${className}`}>
      {label}
      <input type="checkbox" {...props} />
      <span className="c-checkbox__checkmark" />
    </label>
  );
};
export default CheckBox;
