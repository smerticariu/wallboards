import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleModalSelectActiveElementAC,
  handleWallboardActiveModalAC,
} from "src/store/actions/wallboards.action";
import useOnClickOutside from "../../../common/hooks/useOnClickOutside";

const ModalAddComponent = ({ ...props }) => {
  const modalRef = useRef(null);

  const dispatch = useDispatch();

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

  const handleAddButton = () => {
    const onClickAddButton = (e) => {
      dispatch(handleModalSelectActiveElementAC());
      dispatch(handleWallboardActiveModalAC(null));
    };

    return (
      <>
        <button
          className={`c-button c-button--m-left c-button--green`}
          onClick={onClickAddButton}
        >
          Select
        </button>
      </>
    );
  };

  const handleModalLeftSide = () => {
    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">
            Title/Report Name
          </div>
          <input
            className="c-input c-input--grey"
            placeholder="Placeholder..."
          />
        </div>
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Call Queue</div>
          <input
            className="c-input c-input--grey"
            placeholder="Placeholder..."
          />
        </div>
      </div>
    );
  };
  const handleModalRightSide = () => {
    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal__buttons">
          {handleCancelButton()}
          {handleAddButton()}
        </div>
      </div>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div
        ref={modalRef}
        className="c-modal__container c-modal__container--add-component "
      >
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">Add Component</div>
          </div>

          <div className="c-modal__body--add-component">
            {handleModalLeftSide()}
            {handleModalRightSide()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalAddComponent;
