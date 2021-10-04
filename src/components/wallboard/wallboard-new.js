import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WallboardComponents from "./wallboard-componets";
import Toolbar from "../toolbar/toolbar";
import ModalNewWallboard from "../modal/new-wallboard/modal.new-wallboard";
import * as actionTypes from "../../store/actionTypes";

const WallboardNew = () => {
  const isAddComponentModalShow = useSelector(
    (state) => state.wallboards.isAddComponentModalShow
  );
  const dispatch = useDispatch();

  const handleAddComponentModal = () => {
    const onCloseModal = () => {
      dispatch({
        type: actionTypes.HANDLE_ADD_COMPONENT_MODAL_SHOW_STATUS,
      });
    };
    return (
      isAddComponentModalShow && (
        <ModalNewWallboard
          isOpen={isAddComponentModalShow}
          onClose={onCloseModal}
        />
      )
    );
  };

  return (
    <div className="c-new-wallboard">
      <Toolbar template="new-wallboard" />
      {handleAddComponentModal()}
      <WallboardComponents />
    </div>
  );
};

export default WallboardNew;
