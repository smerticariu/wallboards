import React, { useEffect, useRef } from 'react';

const TextArea = ({ value, ...props }) => {
  const inputDateRef = useRef(null);
  useEffect(() => {
    inputDateRef.current.style.height = '5px';
    inputDateRef.current.style.height = inputDateRef.current?.scrollHeight + 'px';
  }, [value]);

  return <textarea ref={inputDateRef} value={value} {...props} />;
};

export default TextArea;
