import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../common/hooks/useOnClickOutside';

const Dropdown = ({ trigger, containerClassName = '', openOnHover, closeOnClick, value, children, ...props }) => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [isDropdownShow, handleIsDropdownShow] = useState(false);
  const handleOnClickOutside = () => {
    handleIsDropdownShow(false);
  };

  useOnClickOutside(triggerRef, () => handleOnClickOutside());

  return (
    <span className="c-dropdown" ref={triggerRef} {...props}>
      <span
        className="c-dropdown__trigger"
        onMouseEnter={() => (openOnHover ? handleIsDropdownShow(true) : null)}
        onClick={() => handleIsDropdownShow(true)}
      >
        {trigger}
      </span>
      {isDropdownShow && (
        <div
          ref={containerRef}
          onClick={() => (closeOnClick ? handleIsDropdownShow(false) : null)}
          className={`c-dropdown__container ${containerClassName}`}
        >
          {children}
        </div>
      )}
    </span>
  );
};

export default Dropdown;
