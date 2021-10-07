import React, { useState } from "react";
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleWallboardActiveModalAC } from "src/store/actions/wallboards.action";
import { RedoIcon } from "src/assets/static/icons/redo";
import { UndoIcon } from "src/assets/static/icons/undo";
import * as actionTypes from "../../store/actionTypes";
import { WALLBOARD_MODAL_NAMES } from "../modal/new-wallboard/modal.new-wallboard.defaults";
const Toolbar = (props) => {
  const dispatch = useDispatch();
  const [wbFilter, setWbFilter] = useState("");
  const [wbSearchValue, setWbSearchValue] = useState("");
  const [wbSearchSuggestions, setWbSearchSuggestions] = useState([]);
  const wallboards = useSelector((state) => state.landing.wallboardsByCategory);
  
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
        payload: event.target.value,
      });
    };
    return (
      <div className="c-toolbar-left__wrapper">
        <input
          onChange={handleChangeTitle}
          className="c-input c-input--new-walboard-title"
          value={newWallboardTitle}
        />

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
    console.log('wallboards', wallboards);
    function escapeRegexCharacters(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    
    function getSuggestions(value) {
      const escapedValue = value.length > 0 ? escapeRegexCharacters(value.trim()) : []
    
      if (escapedValue === "") {
        return [];
      }
    
      const regex = new RegExp("^" + escapedValue, "i");
    
      return wallboards.filter((wallboard) => regex.test(wallboard.name));
    }
    
    function getSuggestionValue(suggestion) {
      return suggestion.name;
    }
    
    function renderSuggestion(suggestion, query) {
      const matches = match(suggestion.name, query.query);
      
      const parts = parse(suggestion.name, matches);
    
      return (
        <span>
          {parts.map((part, index) => {
            const className = part.highlight
              ? "react-autosuggest__suggestion-match"
              : null;
    
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </span>
      );
    }

    const onChange = (event, { newValue, method }) => {
      setWbSearchValue(newValue);
      dispatch({
        type: actionTypes.SET_FILTERED_WALLBOARDS,
        payload: newValue
      });
    };
  
    const onSuggestionsFetchRequested = ({ value }) => {
      
      setWbSearchSuggestions(getSuggestions(value));
    };
  
    const onSuggestionsClearRequested = () => {
      setWbSearchSuggestions(getSuggestions([]));
    };

    const inputProps = {
      placeholder: "Search Wallboards...",
      value: wbSearchValue,
      onChange: onChange
    };


    const updateFilterInput = (e) => {
      setWbFilter(e.target.value);
      dispatch({
        type: actionTypes.SET_FILTERED_WALLBOARDS,
        payload: e.target.value,
      });
    };
    
    return (
      <Autosuggest
        suggestions={wbSearchSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      // <input
      //   className="c-input c-input--landing-search"
      //   value={wbFilter}
      //   placeholder="Search dashboards…"
      //   type="text"
      //   onChange={(e) => updateFilterInput(e)}
      // />
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
      dispatch(
        handleWallboardActiveModalAC(WALLBOARD_MODAL_NAMES.SELECT_COMPONENT)
      );
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
