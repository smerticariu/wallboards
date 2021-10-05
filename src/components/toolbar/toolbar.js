import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CheckIcon } from "src/assets/static/icons/check";
import * as actionTypes from "../../store/actionTypes";
const Toolbar = (props) => {
  const [wbFilter, setWbFilter] = useState("");
  useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userInfo);
  const newWallboardTitle = useSelector(
    (state) => state.wallboards.newWallboardData.title
  );
  const heading = () => {
    return (
      <div className="c-toolbar-left__wrapper">
        <h1 className="c-toolbar-left__heading">Recent Wallboards</h1>
        <p className="c-toolbar-left__wb-no">10 Wallboards Items</p>
      </div>
    );
  };
  const newWallboardHeading = () => {
    const handleChangeTitle = (event) => {
      dispatch({
        type: actionTypes.HANDLE_NEW_WALLBOARD_TITLE,
        payload: event.currentTarget.textContent,
      });
    };
    return (
      <div className="c-toolbar-left__wrapper">
        <h1
          onChange={handleChangeTitle}
          className="c-toolbar-left__heading c-toolbar-left__heading--new-wallboard"
        >
          {newWallboardTitle}
        </h1>
        <p className="c-toolbar-left__wb-no">
          Viewing as {userData.firstName} {userData.lastName}
        </p>
      </div>
    );
  };

  const handleLeftToolbar = (template) => {
    switch (template) {
      case "landing":
        return heading();
      case "new-wallboard":
        return newWallboardHeading();
      case "wb-read-only":
        return (
          <h1
            className="c-toolbar-left__heading c-toolbar-left__heading--new-wallboard">
              {props.wbName}
          </h1>
        )
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
        className="c-input c-input--landing-search"
        value={wbFilter}
        placeholder="Search dashboards…"
        type="text"
        onChange={(e) => updateFilterInput(e)}
      />
    );
  };

  const handleNewWallboardButton = () => {
    return (
      <Link to="/wallboard/new">
        <button className="c-button c-button--m-left">+ New Wallboard</button>
      </Link>
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

  const handleNewComponentButton = () => {
    const onClickNewComponentModal = () => {
      dispatch({
        type: actionTypes.HANDLE_ADD_COMPONENT_MODAL_SHOW_STATUS,
      });
    };

    return (
      <button
        onClick={onClickNewComponentModal}
        className="c-button c-button--blue"
      >
        + Add Component
      </button>
    );
  };

  const handleBackToButton = () => {
    return (
      <div className="c-arrow-button c-arrow-button--m-left ">
        <button className="c-arrow-button__arrow">
          <CheckIcon />
        </button>
        <hr className="c-arrow-button__separator" />
        <button className="c-arrow-button__arrow">
          <CheckIcon />
        </button>
      </div>
    );
  };

  const handleSaveButton = () => {
    return <button className="c-button c-button--m-left">Save</button>;
  };
  const handleCloseButton = () => {
    return <button className="c-button c-button--m-left">Close</button>;
  };
  const handleRunButton = () => {
    return (
      <button className="c-button c-button--blue c-button--m-left">Run</button>
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
      case "new-wallboard":
        return (
          <>
            {handleNewComponentButton()}
            {handleBackToButton()}
            {handleSaveButton()}
            {handleCloseButton()}
            {handleRunButton()}
          </>
        );
      case "wb-read-only":
        return (
          <button 
            className="c-button c-button--m-left" 
            onClick={() => props.logout()}>
              Logout
          </button>
        )
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
