import React from "react";
import { useSelector } from "react-redux";
import WallboardComponents from "./wallboard-components";
import Toolbar from "../toolbar/toolbar";
import ModalNewWallboard from "../modal/new-wallboard/modal.new-wallboard";
import { WALLBOARD_MODAL_NAMES } from "../modal/new-wallboard/modal.new-wallboard.defaults";
import ModalAddComponent from "../modal/add-component/modal.add-component";
import GridPage from "../grid/grid";

const WallboardNew = () => {
  const activeModalName = useSelector(
    (state) => state.wallboards.activeModalName
  );

  return (
    <div className="c-wallboard--new">
      <Toolbar template="new-wallboard" />
      {activeModalName === WALLBOARD_MODAL_NAMES.SELECT_COMPONENT && (
        <ModalNewWallboard />
      )}
      {activeModalName === WALLBOARD_MODAL_NAMES.ADD_COMPONENT && (
        <ModalAddComponent />
      )}

      {activeModalName ? <GridPage /> : <WallboardComponents />}
    </div>
  );
};

export default WallboardNew;
