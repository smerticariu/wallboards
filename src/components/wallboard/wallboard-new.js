import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WallboardComponents from "./wallboard-components";
import Toolbar from "../toolbar/toolbar";
import ModalNewWallboard from "../modal/new-wallboard/modal.new-wallboard";
import * as actionTypes from "../../store/actionTypes";
import { WALLBOARD_MODAL_NAMES } from "../modal/new-wallboard/modal.new-wallboard.defaults";
import ModalAddComponent from "../modal/add-component/modal.add-component";

const WallboardNew = () => {
  const activeModalName = useSelector(
    (state) => state.wallboards.activeModalName
  );
  const dispatch = useDispatch();

  return (
    <div className="c-wallboard--new">
      <Toolbar template="new-wallboard" />
      {activeModalName === WALLBOARD_MODAL_NAMES.SELECT_COMPONENT && (
        <ModalNewWallboard />
      )}
      {/* {activeModalName === WALLBOARD_MODAL_NAMES.ADD_COMPONENT && ( */}
      {true && <ModalAddComponent />}
      <WallboardComponents />
    </div>
  );
};

export default WallboardNew;
