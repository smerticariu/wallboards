import React, { useRef } from 'react';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const StepPopup = ({ onClose, children, ...props }) => {
  const triggerRef = useRef(null);

  const handleOnClickOutside = () => {
    onClose(false);
  };

  useOnClickOutside(triggerRef, () => handleOnClickOutside());

  return (
    <div ref={triggerRef} className="step-popup">
      <div className="step-popup__container">{children}</div>
    </div>
  );
};

export default StepPopup;
