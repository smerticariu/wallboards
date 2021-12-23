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
import { getSvgLastLineInitialValues, SCREEN_OPTIONS_ID, WALLBOARD_SVG_VALUES } from '../../common/defaults/wallboards.defaults';
import { DEFAULTS } from '../../common/defaults/defaults';
import SVGLastLine from './common/svg-last-line';
import { getWallboardGroupLastSvgLineData } from '../../common/utils/getWallboardGroupLastSvgLineData';

const WallboardGroupComponents = () => {
  const wallboardGroup = useSelector((state) => state.wallboards.present.wallboardGroup.wallboardGroup);
  const dispatch = useDispatch();
  const [activeModal, handleActiveModal] = useState(null);
  const [selectedStep, handleSelectedStep] = useState(null);
  const [steps, setSteps] = useState(null);
  const [coords, setCoords] = useState([]);
  const { width } = useWindowSize();
  const [svgData, setSvgData] = useState(getSvgLastLineInitialValues());
  const containerRef = useRef();
  useEffect(() => {
    const getStepsForOneRow = () => {
      if (width > 1600) return 4;
      if (width > 1200) return 3;
      return 2;
    };
    const stepsNo = wallboardGroup.steps.length;
    const spetsInRow = getStepsForOneRow();
    const rowNo = Math.ceil(stepsNo / spetsInRow);
    let stepsRowCopy = [...new Array(rowNo)].map((_, index) => {
      if (index % 2 === 0) return wallboardGroup.steps.slice(index * spetsInRow, (index + 1) * spetsInRow);
      return wallboardGroup.steps.slice(index * spetsInRow, (index + 1) * spetsInRow).reverse();
    });

    setSteps([...stepsRowCopy].reverse());
    // eslint-disable-next-line
  }, [wallboardGroup.steps, width]);

  useEffect(() => {
    const stepsNo = wallboardGroup.steps.length;
    if (stepsNo > 1 && steps) {
      setCoords(
        wallboardGroup.steps
          .map((step, index) => {
            return {
              ...WALLBOARD_SVG_VALUES,
              start: `${step.stepId}`,
              end: `${index + 1 === stepsNo ? wallboardGroup.steps[0].stepId : wallboardGroup.steps[index + 1].stepId}`,
              endAnchor: index === stepsNo - 1 ? 'top' : 'auto',
            };
          })
          .filter((_, i, arr) => i < arr.length - 1) // remove last line
      );

      setSvgData(getWallboardGroupLastSvgLineData(containerRef, wallboardGroup, steps));
    } else {
      setCoords([]);
    }
    // eslint-disable-next-line
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
        {!!wallboardGroup.steps.length && (
          <div className="wb-group__steps" ref={containerRef}>
            {steps?.map((stepGroup, stepGropuIndex) => (
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
            {!!svgData.points.length && wallboardGroup.steps.length > 1 && <SVGLastLine svgData={svgData} />}
          </div>
        )}
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

export default WallboardGroupComponents;
