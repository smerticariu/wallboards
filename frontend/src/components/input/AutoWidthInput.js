import React, { useEffect, useRef } from 'react';

const AutoWidthInput = ({ value, ...props }) => {
  const inputRef = useRef();
  useEffect(() => {
    if (value.length > 25 || value.length < 10) return;
    inputRef.current.style.width = value.length + 'ch';
  }, [value]);

  return <input ref={inputRef} value={value} {...props} />;
};

export default AutoWidthInput;
