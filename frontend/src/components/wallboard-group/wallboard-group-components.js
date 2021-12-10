import React, { useEffect, useRef, useState } from 'react';
import NewStep from './common/new-step';
import Xarrow from 'react-xarrows';
import NewEmptyStep from './common/new-empty-step';
import { useDispatch, useSelector } from 'react-redux';
import ModalNewWallboard from '../modal/new-wallboard/modal.new-wallboard';
import ModalRemoveStep from '../modal/remove-step/modal.remove-step';
import StepWithWallboard from './common/step-with-wallboard';
import useWindowSize from '../../common/hooks/useWindowSize';
import {
  handleChangeStepTimeAC,
  removeStepForWallboardGroupAC,
  removeWallboardForWallboardGroupAC,
} from '../../store/actions/wallboards.action';
import { SCREEN_OPTIONS_ID } from '../../common/defaults/wallboards.defaults';
import { DEFAULTS } from '../../common/defaults/defaults';

const WallboardComponents = () => {
  const wallboardGroup = useSelector((state) => state.wallboards.present.wallboardGroup.wallboardGroup);
  const dispatch = useDispatch();
  const [activeModal, handleActiveModal] = useState(null);
  const [selectedStep, handleSelectedStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const [coords, setCoords] = useState([]);
  const { width } = useWindowSize();
  const [svgData, setSvgData] = useState({
    svgSize: {
      x: 0,
      y: 0,
    },
    svgStartPoint: {
      x: 0,
      y: 0,
    },
    svgEndPoint: {
      x: 0,
      y: 0,
    },
  });
  const containerRef = useRef();
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
        wallboardGroup.steps
          .map((step, index) => {
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
          .filter((_, i, arr) => i < arr.length - 1)
      );

      const containerPosition = containerRef.current.getBoundingClientRect();
      const firstStepPosition = document.getElementById(wallboardGroup.steps[0].stepId).getBoundingClientRect();
      const lastStepPosition = document.getElementById(wallboardGroup.steps.slice(-1)[0]?.stepId).getBoundingClientRect();
      const firstElementTop = firstStepPosition.top - containerPosition.top;
      const firstElementLeft = firstStepPosition.left - containerPosition.left;
      const lastElementTop = lastStepPosition.top - containerPosition.top;
      const lastElementLeft = lastStepPosition.left - containerPosition.left;

      const svgStartPoint = {
        x: lastElementTop + lastStepPosition.height / 2,
        y: lastElementLeft,
      };
      const svgEndPoint = {
        x: firstElementTop,
        y: firstElementLeft + firstStepPosition.height / 2,
      };
      const svgSize = {
        x: containerPosition.width,
        y: containerPosition.height,
      };
      setSvgData({
        svgSize,
        svgStartPoint,
        svgEndPoint,
      });
    } else {
      setCoords([]);
    }
  }, [steps]);

  const handleChangeStepTime = (event, stepId) => {
    dispatch(handleChangeStepTimeAC(stepId, +event.target.value));
  };
  const handleScreenOptionClick = (optionId, step) => {
    handleSelectedStep(step);
    switch (optionId) {
      case SCREEN_OPTIONS_ID.CHANGE:
        handleActiveModal(DEFAULTS.MODAL.MODAL_NAMES.NEW_STEP_WALLBOARD);
        break;
      case SCREEN_OPTIONS_ID.REMOVE_STEP:
        handleActiveModal(DEFAULTS.MODAL.MODAL_NAMES.REMOVE_STEP);
        break;
      case SCREEN_OPTIONS_ID.REMOVE_WALLBOARD:
        handleActiveModal(DEFAULTS.MODAL.MODAL_NAMES.REMOVE_WALLBOARD);
        break;
      default:
        break;
    }
  };

  const onPlusClick = (step) => {
    handleSelectedStep(step);
    handleActiveModal(DEFAULTS.MODAL.MODAL_NAMES.NEW_STEP_WALLBOARD);
  };
  return (
    <div className="wb-group">
      <div className="wb-group__title">Wallboard group configuration setup</div>
      <div className="wb-group__wallboards">
        <div className="wb-group__steps" ref={containerRef}>
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
                      onPlusClick={onPlusClick}
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
          {svgData && (
            <div style={{ position: 'absolute', zIndex: 1 }}>
              <svg
                width={svgData.svgSize.x}
                height={svgData.svgSize.y}
                overflow="auto"
                style={{ position: 'absolute', left: '0', top: '0', pointerEvents: 'none' }}
              >
                <path
                  d={`M ${svgData.svgStartPoint.y} ${svgData.svgStartPoint.x} L ${svgData.svgEndPoint.y} ${svgData.svgEndPoint.x}`}
                  stroke="#00a9ce"
                  strokeDasharray="0 0"
                  strokeWidth="1"
                  fill="transparent"
                  pointerEvents="visibleStroke"
                ></path>
                <g
                  fill="#00a9ce"
                  pointerEvents="auto"
                  transform="translate(10.57679983529089,192.3212508946138) rotate(-195.20578048710772) scale(6)"
                  opacity="1"
                >
                  <animate dur="0.4" attributeName="opacity" from="0" to="1" begin="indefinite" repeatCount="0" fill="freeze"></animate>
                </g>
              </svg>
            </div>
          )}
        </div>
        {wallboardGroup.steps.length < 10 && <NewStep />}
      </div>
      {activeModal === DEFAULTS.MODAL.MODAL_NAMES.NEW_STEP_WALLBOARD && (
        <ModalNewWallboard selectedWallboardId={selectedStep.wallboardId} onClose={handleActiveModal} stepId={selectedStep.stepId} />
      )}
      {activeModal === DEFAULTS.MODAL.MODAL_NAMES.REMOVE_STEP && (
        <ModalRemoveStep
          title={DEFAULTS.MODAL.REMOVE_STEP_MODAL.TITLE}
          description={DEFAULTS.MODAL.REMOVE_STEP_MODAL.QUESTION}
          onClose={() => handleActiveModal(null)}
          onOkClick={removeStepForWallboardGroupAC}
          id={selectedStep.stepId}
        />
      )}
      {activeModal === DEFAULTS.MODAL.MODAL_NAMES.REMOVE_WALLBOARD && (
        <ModalRemoveStep
          title={DEFAULTS.MODAL.REMOVE_WALLBOARD_MODAL.TITLE}
          description={DEFAULTS.MODAL.REMOVE_WALLBOARD_MODAL.QUESTION}
          onClose={() => handleActiveModal(null)}
          onOkClick={removeWallboardForWallboardGroupAC}
          id={selectedStep.stepId}
        />
      )}
    </div>
  );
};

export default WallboardComponents;
