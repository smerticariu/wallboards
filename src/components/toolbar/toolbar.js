import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import ModalNewWallboard from "../modal/new-wallboard/modal.new-wallboard";
const Toolbar = (props) => {
  const [wbFilter, setWbFilter] = useState("");
  const [isModalNewWallboardShow, handleIsModalNewWallboardShow] =
    useState(false);
  const dispatch = useDispatch();

  const heading = () => {
    return (
      <div className="c-toolbar-left__wrapper">
        <h1 className="c-toolbar-left__heading">Recent Wallboards</h1>
        <p className="c-toolbar-left__wb-no">10 Wallboards Items</p>
      </div>
    );
  };

  const handleLeftToolbar = (template) => {
    switch (template) {
      case "landing":
        return heading();

      default:
        return null;
    }
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
        className="c-toolbar-right__search"
        value={wbFilter}
        placeholder="Search dashboards…"
        type="text"
        onChange={(e) => updateFilterInput(e)}
      />
    );
  };

  const handleNewWallboardButton = () => {
    const onClickNewWallboardButton = (e) => {
      handleIsModalNewWallboardShow(true);
    };

    return (
      <>
        <button
          className="c-button c-button--m-left"
          onClick={onClickNewWallboardButton}
        >
          + New Wallboard
        </button>
        {isModalNewWallboardShow && (
          <ModalNewWallboard
            onClose={() => handleIsModalNewWallboardShow(false)}
            isOpen={isModalNewWallboardShow}
          />
        )}
      </>
    );
  };

  const handleNewWallboardGroupButton = () => {
    const onClickNewWallboardGroupButton = (e) => {
      dispatch({
        type: actionTypes.SET_FILTERED_WALLBOARDS,
        payload: e.target.value,
      });
    };

    return (
      <button
        className="c-button c-button--m-left"
        onClick={onClickNewWallboardGroupButton}
      >
        + New Wallboard Group
      </button>
    );
  };

  const handleRightToolbar = (template) => {
    switch (template) {
      case "landing":
        return (
          <>
            {handleFilterInput()}
            {handleNewWallboardButton()}
            {handleNewWallboardGroupButton()}
          </>
        );
    }
  };

  return (
    <div className="c-toolbar">
      <div className="c-toolbar-left">{handleLeftToolbar(props.template)}</div>
      <div className="c-toolbar-right">
        {handleRightToolbar(props.template)}
      </div>
    </div>
  );
};

export default Toolbar;
