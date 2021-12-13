import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const ModalRemoveStep = ({ onOkClick, id, description, title, onClose, ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useOnClickOutside(modalRef, () => onClose());

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      onClose();
    };
    return (
      <>
        <button className="c-button c-button--m-left-large c-button--red" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleDeleteButton = () => {
    const onClickDeleteButton = () => {
      dispatch(onOkClick(id));
      onClose();
    };

    return (
      <>
        <button className={`c-button  c-button--blue`} onClick={onClickDeleteButton}>
          Ok
        </button>
      </>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--call-status ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title c-modal__title--remove-step">{title}</div>
          </div>
          <div className="c-modal__body c-modal__body--save-changes">
            <div className="c-modal__body--remove-step">{description}</div>
          </div>
          <div className="c-modal__footer c-modal__footer--remove-step">
            <div className="c-modal__footer-right-side">
              {handleDeleteButton()}
              {handleCancelButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalRemoveStep;
