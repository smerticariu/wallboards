import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../../common/hooks/useOnClickOutside';
import ReactDOM from 'react-dom';
import useWindowSize from '../../common/hooks/useWindowSize';
const Dropdown = ({
  trigger,
  className = '',
  containerClassName = '',
  closeOnHover,
  openOnHover,
  closeOnClick,
  isDisable,
  value,
  children,
  ...props
}) => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [isDropdownShow, handleIsDropdownShow] = useState(false);
  const handleOnClickOutside = () => {
    handleIsDropdownShow(false);
  };

  useOnClickOutside(triggerRef, () => handleOnClickOutside());
  const screenSize = useWindowSize();
  useEffect(() => {
    if (isDropdownShow) {
      window.addEventListener(
        'scroll',
        (e) => {
          if (!e.target.classList?.contains('c-dropdown__container')) handleIsDropdownShow(false);
        },
        true
      );
      return () => window.removeEventListener('scroll', null);
    }
  }, [isDropdownShow]);
  useEffect(() => {
    if (isDropdownShow && !isDisable) {
      const container = document.createElement('div');
      const { bottom, top, left, right, width } = triggerRef.current.getBoundingClientRect();
      container.classList.add('c-dropdown__container');
      if (screenSize.height < bottom + 250) {
        container.style.bottom = screenSize.height - top + 'px';
      } else {
        container.style.top = bottom + 5 + 'px';
      }
      if (screenSize.width < right + 250) {
        container.style.right = screenSize.width - right + 'px';
      } else {
        container.style.left = left + 'px';
      }
      container.style.width = width + 'px';
      container.style.minWidth = '150px';
      if (containerClassName) container.classList.add(containerClassName);
      ReactDOM.render(
        <div
          ref={containerRef}
          onClick={() => (closeOnClick ? handleIsDropdownShow(false) : null)}
          onMouseLeave={() => (closeOnHover ? handleIsDropdownShow(false) : null)}
        >
          {children}
        </div>,
        document.body.appendChild(container)
      );
      return () => document.body.removeChild(container);
    }
  }, [isDropdownShow]);

  return (
    <span
      onMouseLeave={() => (closeOnHover ? handleIsDropdownShow(false) : null)}
      className={`c-dropdown ${className}`}
      ref={triggerRef}
      {...props}
    >
      <span
        className="c-dropdown__trigger"
        onMouseEnter={() => (openOnHover ? handleIsDropdownShow(true) : null)}
        onClick={() => handleIsDropdownShow(true)}
      >
        {trigger}
      </span>
    </span>
  );
};

export default Dropdown;
