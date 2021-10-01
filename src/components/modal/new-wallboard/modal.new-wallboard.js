import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";
import useOnClickOutside from "../../../common/hooks/useOnClickOutside";
import {
  MODAL_NEW_WALLBOARD_DEFAULTS,
  MODAL_NEW_WALLBOARD_SECITONS,
  MODAL_ADD_COMPONENT_OPTIONS,
} from "./modal.new-wallboard.defaults";

const ModalNewWallboard = ({ isOpen, onOpen, onClose, ...props }) => {
  const modalRef = useRef(null);
  const [wbFilter, setWbFilter] = useState("");

  const [activeSectionValue, setActiveSectionValue] = useState(
    MODAL_NEW_WALLBOARD_SECITONS.QUEUES
  );
  useOnClickOutside(modalRef, () => onClose());
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (onOpen) onOpen();
    return () => {
      if (onClose) onClose();
    };
  }, []);

  const handleLeftSidebar = () => {
    const handleClick = (e, category) => {
      const selectedElement = document.querySelector(
        ".c-modal--new-wallboard__nav-item--selected"
      );

      if (selectedElement)
        selectedElement.classList.remove(
          "c-modal--new-wallboard__nav-item--selected"
        );

      e.target.classList.add("c-modal--new-wallboard__nav-item--selected");
      setActiveSectionValue(category);
    };

    return (
      <div className="c-modal--new-wallboard__categories">
        <div className="c-modal--new-wallboard__header">
          Component Categories
        </div>
        {MODAL_NEW_WALLBOARD_DEFAULTS.map((navItem) => (
          <div
            key={navItem.value}
            className="c-modal--new-wallboard__nav-item"
            onClick={(e) => handleClick(e, navItem.value)}
          >
            {navItem.text}
          </div>
        ))}
      </div>
    );
  };

  const handleList = () => {
    return (
      <div className="c-modal--new-wallboard__list">
        {MODAL_ADD_COMPONENT_OPTIONS.map((option) => (
          <div key={option.NAME} className="c-modal--new-wallboard__list__item">
            <div className="c-modal--new-wallboard__list__title">
              {option.NAME}
            </div>
            <div className="c-modal--new-wallboard__list__subtitle">
              <div className="c-modal--new-wallboard__list__text">
                {option.SERVICE}
              </div>
              <div className="c-modal--new-wallboard__list__separator">|</div>
              <div className="c-modal--new-wallboard__list__text">
                {option.DATE}
              </div>
              <div className="c-modal--new-wallboard__list__separator">|</div>
              <div className="c-modal--new-wallboard__list__text">
                {option.STATUS}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleFilterInput = () => {
    const updateFilterInput = (e) => {
      setWbFilter(e.target.value);
      dispatch({
        type: actionTypes.SET_FILTERED_WALLBOARDS,
        payload: e.target.value,
      });
    };

    return (
      <input
        value={wbFilter}
        type="text"
        onChange={(e) => updateFilterInput(e)}
      />
    );
  };

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      if (onClose) onClose();
    };

    return (
      <>
        <button className="c-button" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleSelectButton = () => {
    const onClickSelectButton = (e) => {};

    return (
      <>
        <button
          className="c-button c-button--grey c-button--m-left  "
          onClick={onClickSelectButton}
        >
          Select
        </button>
      </>
    );
  };

  return (
    <div
      className={`c-modal c-modal--new-wallboard ${
        isOpen ? "c-modal--open" : ""
      }`}
    >
      <div
        ref={modalRef}
        className="c-modal__container c-modal__container--new-wallboard"
      >
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">Select a component</div>
          </div>

          <div className="c-modal__body c-modal__body--new-wallboard">
            {handleLeftSidebar()}
            <div className="c-modal--new-wallboard__form">
              {handleFilterInput()}
              {handleList()}
              <div className="c-modal--new-wallboard__buttons">
                {handleCancelButton()}
                {handleSelectButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalNewWallboard;
