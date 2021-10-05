import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleWallboardActiveModalAC } from "src/store/actions/wallboards.action";
import * as actionTypes from "../../store/actionTypes";
import { WALLBOARD_MODAL_NAMES } from "../modal/new-wallboard/modal.new-wallboard.defaults";

const WallboardComponents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const el = document.querySelector(".c-panel");
    if (el) {
      // el.style.height = window.innerHeight - el.offsetTop - 24 + "px";
    }
  }, []);

  const handleNewComponentButton = () => {
    const onClickNewComponentModal = () => {
      dispatch(
        handleWallboardActiveModalAC(WALLBOARD_MODAL_NAMES.SELECT_COMPONENT)
      );
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
