import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

const WallboardComponents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const el = document.querySelector(".c-panel");
    if (el) {
      el.style.height = window.innerHeight - el.offsetTop - 24 + "px";
    }
  }, []);

  const handleNewComponentButton = () => {
    const onClickNewComponentModal = () => {
      dispatch({
        type: actionTypes.HANDLE_ADD_COMPONENT_MODAL_SHOW_STATUS,
      });
    };

    return (
      <button
        onClick={onClickNewComponentModal}
        className="c-button c-button--m-auto "
      >
        Add Component
      </button>
    );
  };

  return (
    <div className="c-panel">
      <div className="c-panel__info">
        <div className="c-panel__info-text">
          <span>This panel has no components.</span>
          <span>To start adding components, click the button below.</span>
        </div>
        {handleNewComponentButton()}
      </div>
    </div>
  );
};

export default WallboardComponents;
