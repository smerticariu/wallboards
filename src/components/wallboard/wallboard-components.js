import React from 'react';
import { useDispatch } from 'react-redux';
import { DEFAULTS } from '../../common/defaults/defaults';
import { handleWallboardActiveModalAC } from '../../store/actions/modal.action';

const WallboardComponents = () => {
  const dispatch = useDispatch();

  const handleNewComponentButton = () => {
    const onClickNewComponentModal = () => {
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.SELECT_COMPONENT));
    };

    return (
      <button onClick={onClickNewComponentModal} className="c-button c-button--m-auto ">
        Add Component
      </button>
    );
  };

  return (
    <div className="c-panel">
      <div className="c-panel__info">
        <div className="c-panel__info-text">
          <span>This wallboard has no components.</span>
          <span>To start adding components, click the button below.</span>
        </div>
        {handleNewComponentButton()}
      </div>
    </div>
  );
};

export default WallboardComponents;
