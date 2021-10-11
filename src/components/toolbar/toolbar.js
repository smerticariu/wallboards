import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleNewWallboardTitleAC, handleWallboardActiveModalAC, setFiltredWallboardsAC } from 'src/store/actions/wallboards.action';
import { RedoIcon } from 'src/assets/static/icons/redo';
import { UndoIcon } from 'src/assets/static/icons/undo';
import { WALLBOARD_MODAL_NAMES } from '../modal/new-wallboard/modal.new-wallboard.defaults';
import CustomAutosuggest from '../autosuggest/autosuggest';
const Toolbar = (props) => {
  const dispatch = useDispatch();
  const [wbSearchValue, setWbSearchValue] = useState('');
  const wallboards = useSelector((state) => state.landing.wallboardsByCategory);

  const userData = useSelector((state) => state.login.userInfo);
  const newWallboardTitle = useSelector((state) => state.wallboards.newWallboardData.title);

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
      dispatch(handleNewWallboardTitleAC(event.target.value));
    };
    return (
      <div className="c-toolbar-left__wrapper">
        <input onChange={handleChangeTitle} className="c-input c-input--new-walboard-title" value={newWallboardTitle} />

        <p className="c-toolbar-left__wb-no">
          Viewing as {userData.firstName} {userData.lastName}
        </p>
      </div>
    );
  };

  const handleLeftToolbar = (template) => {
    switch (template) {
      case 'landing':
        return heading();
      case 'new-wallboard':
        return newWallboardHeading();
      case 'wb-read-only':
        return <h1 className="c-toolbar-left__heading c-toolbar-left__heading--new-wallboard">{props.wbName}</h1>;
      default:
        return null;
    }
  };

  const handleFilterInput = () => {
    const onChangeSearchInput = (value, name) => {
      setWbSearchValue(value);
      dispatch(setFiltredWallboardsAC(value));
    };

    const allTitlesForAutocomplete = wallboards.map(({ name }) => name);

    return (
      <div className="c-toolbar-right__search-input">
        <CustomAutosuggest
          name="skill"
          placeholder="Search Wallboards..."
          onChange={onChangeSearchInput}
          value={wbSearchValue}
          allTitles={allTitlesForAutocomplete}
        />
      </div>
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
      dispatch(setFiltredWallboardsAC(e.target.value));
    };

    return (
      <button className="c-button c-button--m-left" onClick={onClickNewWallboardGroupButton}>
        + New Wallboard Group
      </button>
    );
  };

  const handleNewComponentButton = () => {
    const onClickNewComponentModal = () => {
      dispatch(handleWallboardActiveModalAC(WALLBOARD_MODAL_NAMES.SELECT_COMPONENT));
    };

    return (
      <button onClick={onClickNewComponentModal} className="c-button c-button--blue">
        + Add Component
      </button>
    );
  };

  const handleBackToButton = () => {
    return (
      <div className="c-arrow-button c-arrow-button--m-left ">
        <button className="c-arrow-button__arrow">
          <UndoIcon className="i--undo" />
        </button>
        <hr className="c-arrow-button__separator" />
        <button className="c-arrow-button__arrow">
          <RedoIcon className="i--redo--disabled" />
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
    return <button className="c-button c-button--blue c-button--m-left">Run</button>;
  };

  const handleRightToolbar = (template) => {
    switch (template) {
      case 'landing':
        return (
          <>
            {handleFilterInput()}
            {handleNewWallboardButton()}
            {handleNewWallboardGroupButton()}
          </>
        );
      case 'new-wallboard':
        return (
          <>
            {handleNewComponentButton()}
            {handleBackToButton()}
            {handleSaveButton()}
            {handleCloseButton()}
            {handleRunButton()}
          </>
        );
      case 'wb-read-only':
        return (
          <button className="c-button c-button--m-left" onClick={() => props.logout()}>
            Logout
          </button>
        );
      default:
        return;
    }
  };

  return (
    <div className="c-toolbar">
      <div className="c-toolbar-left">{handleLeftToolbar(props.template)}</div>
      <div className="c-toolbar-right">{handleRightToolbar(props.template)}</div>
    </div>
  );
};

export default Toolbar;
