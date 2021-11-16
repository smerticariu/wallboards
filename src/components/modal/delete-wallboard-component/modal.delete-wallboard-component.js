import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import { deleteWallboardComponentByIdAC } from 'src/store/actions/wallboards.action';
import { DEFAULTS } from '../../../common/defaults/defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const ModalDeleteWallboardComponent = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const componentForDelete = useSelector((state) => state.modal.wallboardComponentForDelete);
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };

  useOnClickOutside(modalRef, () => closeModal());

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    return (
      <>
        <button className="c-button" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleDeleteButton = () => {
    const onClickDeleteButton = () => {
      dispatch(deleteWallboardComponentByIdAC(componentForDelete.id));
      closeModal();
    };

    return (
      <>
        <button className={`c-button c-button--m-left c-button--blue`} onClick={onClickDeleteButton}>
          Delete
        </button>
      </>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--save-changes ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title c-modal__title--bold">Delete {componentForDelete.name}</div>
          </div>
          <div className="c-modal__body c-modal__body--save-changes">
            <div className="c-modal__body--save-changes__phrase">{DEFAULTS.MODAL.DELETE_WALLBOARD_COMPONENT_MODAL.QUESTION}</div>
          </div>
          <div className="c-modal__footer">
            <div className="c-modal__footer-left-side" />
            <div className="c-modal__footer-right-side">
              {handleCancelButton()}
              {handleDeleteButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalDeleteWallboardComponent;
