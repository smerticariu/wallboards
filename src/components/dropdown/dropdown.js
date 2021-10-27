import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from 'src/common/hooks/useOnClickOutside';

const Dropdown = ({ trigger, closeOnClick, value, children, ...props }) => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [isDropdownShow, handleIsDropdownShow] = useState(false);
  const handleOnClickOutside = () => {
    handleIsDropdownShow(false);
  };

  useOnClickOutside(triggerRef, () => handleOnClickOutside());

  const handleMouseLeave = () => {
    handleOnClickOutside();
  };
  return (
    <span className="c-dropdown" ref={triggerRef} {...props}>
      <span onClick={() => handleIsDropdownShow(true)}>{trigger}</span>
      {isDropdownShow && (
        <div
          onMouseLeave={handleMouseLeave}
          ref={containerRef}
          onClick={() => (closeOnClick ? handleIsDropdownShow(false) : null)}
          className="c-dropdown__container"
        >
          {children}
        </div>
      )}
    </span>
  );
};

export default Dropdown;
