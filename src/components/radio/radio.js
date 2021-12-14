import React from "react";

const Radio = ({ label, ...props }) => {
  return (
    <label className="c-radio">
      <input type="radio" className="c-radio__input" {...props} />
      <span className="c-radio__label">{label}</span>
    </label>
  );
};
export default Radio;
