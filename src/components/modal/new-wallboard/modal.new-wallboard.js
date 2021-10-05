import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleModalSelectActiveElementAC,
  handleWallboardActiveModalAC,
} from "src/store/actions/wallboards.action";
import useOnClickOutside from "../../../common/hooks/useOnClickOutside";
import {
  MODAL_NEW_WALLBOARD_DEFAULTS,
  MODAL_NEW_WALLBOARD_SECITONS,
  MODAL_ADD_COMPONENT_OPTIONS,
  WALLBOARD_MODAL_NAMES,
} from "./modal.new-wallboard.defaults";

const ModalNewWallboard = ({ ...props }) => {
  const modalRef = useRef(null);
  const [newWbFilter, setNewWbFilter] = useState("");

  const [activeSectionValue, setActiveSectionValue] = useState(
    MODAL_NEW_WALLBOARD_SECITONS.QUEUES
  );

  const [selectedListItem, setSelectedListItem] = useState();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };
  useOnClickOutside(modalRef, () => closeModal());

  const handleLeftSidebar = () => {
    const handleClick = (e, category) => {
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
            className={`c-modal--new-wallboard__nav-item ${
              activeSectionValue === navItem.value
                ? "c-modal--new-wallboard__nav-item--selected"
                : ""
            }`}
            onClick={(e) => handleClick(e, navItem.value)}
          >
            {navItem.text}
          </div>
        ))}
      </div>
    );
  };

  const handleList = () => {
    const handleSelectedItem = (name) => {
      setSelectedListItem(name);
    };

    return (
      <div className="c-modal--new-wallboard__list">
        {MODAL_ADD_COMPONENT_OPTIONS.filter((option) =>
          option.NAME.toLowerCase().includes(newWbFilter.toLowerCase())
        ).map((option) => (
          <div
            key={option.NAME}
            onClick={() => handleSelectedItem(option.NAME)}
            className={`c-modal--new-wallboard__list-item ${
              selectedListItem === option.NAME
                ? "c-modal--new-wallboard__list-item--selected"
                : ""
            }`}
          >
            <div className="c-modal--new-wallboard__list-title">
              {option.NAME}
            </div>
            <div className="c-modal--new-wallboard__list-subtitle">
              <div className="c-modal--new-wallboard__list-text">
                {option.STATUS}
              </div>
              <div className="c-modal--new-wallboard__list-separator">|</div>
              <div className="c-modal--new-wallboard__list-text">
                {option.DATE}
              </div>
              <div className="c-modal--new-wallboard__list-separator">|</div>
              <div className="c-modal--new-wallboard__list-text">
                {option.SERVICE}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleFilterInput = () => {
    const updateFilterInput = (e) => {
      setNewWbFilter(e.target.value);
    };

    return (
      <input
        className="c-input"
        value={newWbFilter}
        placeholder="Search list…"
        type="text"
        onChange={(e) => updateFilterInput(e)}
      />
    );
  };

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

  const handleSelectButton = () => {
    const onClickSelectButton = (e) => {
      if (selectedListItem) {
        dispatch(handleModalSelectActiveElementAC(selectedListItem));
        dispatch(
          handleWallboardActiveModalAC(WALLBOARD_MODAL_NAMES.ADD_COMPONENT)
        );
      }
    };

    return (
      <>
        <button
          className={`c-button c-button--m-left ${
            selectedListItem ? "c-button--blue" : "c-button--disabled"
          }`}
          onClick={onClickSelectButton}
        >
          Select
        </button>
      </>
    );
  };

  return (
    <div className={`c-modal c-modal--new-wallboard c-modal--open`}>
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
