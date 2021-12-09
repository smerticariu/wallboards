import React, { useEffect, useState } from 'react';
import NewStep from './common/new-step';
import Xarrow from 'react-xarrows';
import NewEmptyStep from './common/new-empty-step';
import { useDispatch, useSelector } from 'react-redux';
import ModalNewWallboard from '../modal/new-wallboard/modal.new-wallboard';
import StepWithWallboard from './common/step-with-wallboard';
import useWindowSize from '../../common/hooks/useWindowSize';
import {
  handleChangeStepTimeAC,
  removeStepForWallboardGroupAC,
  removeWallboardForWallboardGroupAC,
} from '../../store/actions/wallboards.action';
import { SCREEN_OPTIONS_ID } from '../../common/defaults/wallboards.defaults';

const WallboardComponents = () => {
  const wallboardGroup = useSelector((state) => state.wallboards.present.wallboardGroup.wallboardGroup);
  const dispatch = useDispatch();
  const [selectedStep, handleSelectedStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const [coords, setCoords] = useState([]);
  const { width } = useWindowSize();

  useEffect(() => {
    const stepsNo = wallboardGroup.steps.length;
    const spetsInRow = getStepsForOneRow();
    const rowNo = Math.ceil(stepsNo / spetsInRow);
    let stepsRowCopy = [...new Array(rowNo)].map((_, index) => {
      if (index % 2 === 0) return wallboardGroup.steps.slice(index * spetsInRow, (index + 1) * spetsInRow);
      return wallboardGroup.steps.slice(index * spetsInRow, (index + 1) * spetsInRow).reverse();
    });

    setSteps([...stepsRowCopy].reverse());
  }, [wallboardGroup.steps, width]);

  const getStepsForOneRow = () => {
    if (width > 1600) return 4;
    if (width > 1200) return 3;
    return 2;
  };
  useEffect(() => {
    const stepsNo = wallboardGroup.steps.length;
    if (stepsNo > 1) {
      setCoords(
        wallboardGroup.steps.map((step, index) => {
          return {
            start: `${step.stepId}`,
            end: `${index + 1 === stepsNo ? wallboardGroup.steps[0].stepId : wallboardGroup.steps[index + 1].stepId}`,
            startAnchor: 'auto',
            endAnchor: index === stepsNo - 1 ? 'top' : 'auto',
            path: 'straight',
            gridBreak: '50',
            zIndex: 1,
            color: '#00a9ce',
            strokeWidth: 1,
          };
        })
      );
    } else {
      setCoords([]);
    }
  }, [steps]);

  const handleChangeStepTime = (event, stepId) => {
    dispatch(handleChangeStepTimeAC(stepId, +event.target.value));
  };
  const handleScreenOptionClick = (optionId, step) => {
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
    <div className="wb-group">
      <div className="wb-group__title">Wallboard group configuration setup</div>
      <div className="wb-group__wallboards">
        <div className="wb-group__steps">
          {steps.map((stepGroup, stepGropuIndex) => (
            <div
              key={stepGropuIndex}
              tabIndex={stepGropuIndex}
              className={`wb-group__step-group ${steps.length % 2 === 0 ? 'wb-group__step-group--end' : ''}`}
            >
              {stepGroup.map((step) => (
                <div key={step.stepId} className="wb-group__step">
                  {step.wallboardId ? (
                    <StepWithWallboard
                      handleChangeStepTime={handleChangeStepTime}
                      handleScreenOptionClick={handleScreenOptionClick}
                      step={step}
                    />
                  ) : (
                    <NewEmptyStep
                      handleChangeStepTime={handleChangeStepTime}
                      isFirst={step.stepId === wallboardGroup.steps[0]?.stepId}
                      isLast={step.stepId === wallboardGroup.steps.slice(-1)[0]?.stepId}
                      onPlusClick={handleSelectedStep}
                      handleScreenOptionClick={handleScreenOptionClick}
                      step={step}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
          {coords.map((coord) => {
            return <Xarrow key={new Date() * Math.random()} {...coord} />;
          })}
        </div>
        {wallboardGroup.steps.length < 10 && <NewStep />}
      </div>
      {selectedStep && (
        <ModalNewWallboard selectedWallboardId={selectedStep.wallboardId} onClose={handleSelectedStep} stepId={selectedStep.stepId} />
      )}
    </div>
  );
};

export default WallboardComponents;
