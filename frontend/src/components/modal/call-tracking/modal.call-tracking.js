import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

import { addWallboardCallTrackingAC } from '../../../store/actions/wallboards.action';
import { handleCallTrackingDataAC, handleWallboardActiveModalAC, resetNewWidgetModalFormDataAC } from '../../../store/actions/modal.action';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { fetchUserGroupsThunk } from '../../../store/thunk/agents.thunk';
import { CALL_STATISTIC_PERIOD } from '../../../common/defaults/modal.defaults';
import GridCallTracking from '../../grid/widgets/call-tracking';

const ModalCallTracking = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const callTracking = useSelector((state) => state.modal.callTracking);
  const { allCallsQueues } = useSelector((state) => state.callsQueues);
  const { userInfo } = useSelector((state) => state.login);
  const userGroups = useSelector((state) => state.agents.userGroups);
  const [userGroupsLocal, setUserGroupsLocal] = useState([{ ...DEFAULTS.MODAL.CALL_TRACKING.USER_GROUP }]);
  useEffect(() => {
    if (callTracking.isEditMode) return;
    if (allCallsQueues.length) {
      dispatch(
        handleCallTrackingDataAC({
          callQueue: {
            id: allCallsQueues[0].id,
            value: allCallsQueues[0].name,
            errorMessage: '',
          },
        })
      );
    }
    // eslint-disable-next-line
  }, [allCallsQueues]);
  useEffect(() => {
    if (userGroups.length) {
      setUserGroupsLocal([{ ...DEFAULTS.MODAL.CALL_TRACKING.USER_GROUP }, ...userGroups]);
    }
    // eslint-disable-next-line
  }, [userGroups]);
  useEffect(() => {
    dispatch(fetchUserGroupsThunk());
    // eslint-disable-next-line
  }, []);
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
    dispatch(resetNewWidgetModalFormDataAC());
  };

  useOnClickOutside(modalRef, () => {
    closeModal();
  });

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    return (
      <button className="c-button" onClick={onClickCancelButton}>
        Cancel
      </button>
    );
  };

  const handleAddButton = () => {
    const onClickAddButton = (e) => {
      if (!checkIsAlphanumeric(callTracking.title.value)) {
        dispatch(
          handleCallTrackingDataAC({
            title: {
              ...callTracking.title,
              errorMessage: DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE,
            },
          })
        );

        return alert(DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE);
      }
      dispatch(addWallboardCallTrackingAC(callTracking, userInfo));
      closeModal();
    };

    return (
      <button className={`c-button c-button--m-left c-button--blue`} onClick={onClickAddButton}>
        {callTracking.isEditMode ? 'Save' : 'Add'}
      </button>
    );
  };

  const handleModalLeftSide = () => {
    const handleInputAndSelect = (event, inputType) => {
      const { name, value } = event.target;
      switch (inputType) {
        case 'input':
          return dispatch(
            handleCallTrackingDataAC({
              [name]: {
                ...callTracking[name],
                value,
                errorMessage: '',
              },
            })
          );
        case 'select':
          return dispatch(
            handleCallTrackingDataAC({
              [name]: {
                ...callTracking[name],
                id: event.target.selectedOptions[0].value,
                value: event.target.selectedOptions[0].label,
                errorMessage: '',
              },
            })
          );

        default:
          break;
      }
    };

    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.TITLE}</div>
          <input
            className="c-input c-input--grey"
            placeholder={DEFAULTS.MODAL.CALL_TRACKING.PLACEHOLDER.TITLE}
            name="title"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={callTracking.title.value}
          />
          {callTracking.title.errorMessage && <div className="c-input__error-message">{callTracking.title.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.GROUP}</div>
          <select name="group" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={callTracking.group.id}>
            {userGroupsLocal.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.CALL_QUEUE}</div>
          <select
            name="callQueue"
            className="c-select"
            onChange={(e) => handleInputAndSelect(e, 'select')}
            value={callTracking.callQueue.id}
          >
            {allCallsQueues.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.CALL_CATEGORY}</div>
          <select
            name="callCategory"
            className="c-select"
            onChange={(e) => handleInputAndSelect(e, 'select')}
            value={callTracking.callCategory.id}
          >
            {DEFAULTS.MODAL.CALL_TRACKING.CALL_CATEGORY.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.TIME_ZONE}</div>
          <select name="timeZone" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={callTracking.timeZone.id}>
            {DEFAULTS.MODAL.CALL_TRACKING.TIME_ZONE.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.PERIOD}</div>
          <select name="period" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={callTracking.period.id}>
            {DEFAULTS.MODAL.CALL_TRACKING.PERIOD.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        {callTracking.period.id === CALL_STATISTIC_PERIOD.WEEK && (
          <div className="c-modal--add-component__input-section">
            <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.START_WEEK}</div>
            <select
              name="startOfWeek"
              className="c-select"
              onChange={(e) => handleInputAndSelect(e, 'select')}
              value={callTracking.startOfWeek.id}
            >
              {DEFAULTS.MODAL.CALL_TRACKING.START_WEEK.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  const handleModalRightSide = () => {
    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal--add-component__input-label c-modal--add-component__input-label--grey">
          {DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.PREVIEW}
        </div>
        <div className="c-modal__preview-container">
          <div className="c-modal__preview-section">
            <GridCallTracking isPreview={true} widget={{ ...callTracking, title: callTracking.title.value }} />
          </div>
        </div>

        <div className="c-modal__buttons">
          {handleCancelButton()}
          {handleAddButton()}
        </div>
      </div>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--add-component ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">Configuration Options</div>
          </div>

          <div className="c-modal__body--add-component">
            {handleModalLeftSide()}
            {handleModalRightSide()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalCallTracking;
