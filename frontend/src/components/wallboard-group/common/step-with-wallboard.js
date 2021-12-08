import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SettingsIcon } from '../../../assets/static/icons/settings';
import { SCREEN_OPTIONS, SCREEN_OPTIONS_ID } from '../../../common/defaults/wallboards.defaults';
import { removeStepForWallboardGroupAC, removeWallboardForWallboardGroupAC } from '../../../store/actions/wallboards.action';
import StepPopup from './step-popup';
import StepWallboard from './step-wallboard';
const StepWithWallboard = ({ isFirst, handleSelectedStep, step }) => {
  const [isShowStepPopup, handleIsShowStepPopup] = useState(false);
  const dispatch = useDispatch();
  console.log('update wallboard outside');
  const handleScreenOptionClick = (optionId) => {
    handleIsShowStepPopup(false);
    switch (optionId) {
      case SCREEN_OPTIONS_ID.CHANGE:
        handleSelectedStep(step);
        break;
      case SCREEN_OPTIONS_ID.REMOVE_STEP:
        dispatch(removeStepForWallboardGroupAC(step.stepId));
        break;
      case SCREEN_OPTIONS_ID.REMOVE_WALLBOARD:
        dispatch(removeWallboardForWallboardGroupAC(step.stepId));
        break;
      default:
        break;
    }
  };
  return (
    <div className="step" id={step.stepId}>
      <div className="step__container">
        <StepWallboard />
        <div className="step__footer">
          <div className="step__footer-walboard">
            <div className="step__footer-wallboard-name">{step.wallboardName}</div>
            <div className="step__footer-wallboard-description">{step.wallboardDescription}</div>
          </div>
          <div className="step__footer-input-cog">
            <div className="step__footer-input-container">
              <input className="c-input c-input--seconds" value={step.stepTime} onChange={() => {}} />
              <div className="step__footer-seconds">sec</div>
            </div>
            <SettingsIcon onClick={() => handleIsShowStepPopup(true)} className="i--settings" />
          </div>
        </div>
      </div>
      {isShowStepPopup && (
        <StepPopup onClose={handleIsShowStepPopup}>
          <div className="step-popup__title">Screen Options</div>
          {SCREEN_OPTIONS.map((option) => (
            <div key={option.id} onClick={() => handleScreenOptionClick(option.id)} className="step-popup__option">
              {option.name}
            </div>
          ))}
        </StepPopup>
      )}
    </div>
  );
};

export default StepWithWallboard;
