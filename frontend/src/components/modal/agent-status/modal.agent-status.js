import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { addWallboardAgentStatusAC } from '../../../store/actions/wallboards.action';
import { handleAgentStatusDataAC, handleWallboardActiveModalAC, resetNewWidgetModalFormDataAC } from '../../../store/actions/modal.action';
import moment from 'moment';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { exportCSVUserStatusDataThunk, fetchAvailabilityProfilesThunk } from '../../../store/thunk/agents.thunk';
import { CALL_STATISTIC_PERIOD } from '../../../common/defaults/modal.defaults';
import CheckBox from '../../checkbox/checkbox';
import AgentStatusTable from '../../agent-status-table/agent-status-table';

const ModalAgentStatus = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const agentStatus = useSelector((state) => state.modal.agentStatus);
  const { availabilityProfiles } = useSelector((state) => state.agents);
  const { userInfo } = useSelector((state) => state.login);
  const [profilesLocal, setProfilesLocal] = useState([{ ...DEFAULTS.MODAL.CALL_TRACKING.USER_PROFILE }]);

  useEffect(() => {
    if (availabilityProfiles) {
      setProfilesLocal([{ ...DEFAULTS.MODAL.CALL_TRACKING.USER_PROFILE }, ...availabilityProfiles]);
    }
    // eslint-disable-next-line
  }, [availabilityProfiles]);
  useEffect(() => {
    dispatch(fetchAvailabilityProfilesThunk());
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
      <button className="c-button  c-button--m-left" onClick={onClickCancelButton}>
        Cancel
      </button>
    );
  };

  const handleAddButton = () => {
    const onClickAddButton = (e) => {
      let existErrors = false;
      if (!checkIsAlphanumeric(agentStatus.title.value)) {
        dispatch(
          handleAgentStatusDataAC({
            title: {
              ...agentStatus.title,
              errorMessage: DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE,
            },
          })
        );
        existErrors = true;
      }
      if (isNaN(agentStatus.limitResult.value) || agentStatus.limitResult.value < 1) {
        dispatch(
          handleAgentStatusDataAC({
            limitResult: {
              ...agentStatus.limitResult,
              errorMessage: DEFAULTS.MODAL.MESSAGES.MIN_VALUE,
            },
          })
        );
        existErrors = true;
      }
      if (isNaN(agentStatus.limitResult.value) || agentStatus.limitResult.value > 100) {
        dispatch(
          handleAgentStatusDataAC({
            limitResult: {
              ...agentStatus.limitResult,
              errorMessage: DEFAULTS.MODAL.MESSAGES.MAX_VALUE,
            },
          })
        );
        existErrors = true;
      }
      if (existErrors) return;
      dispatch(addWallboardAgentStatusAC(agentStatus, userInfo));
      closeModal();
    };

    return (
      <button className={`c-button c-button--blue`} onClick={onClickAddButton}>
        {agentStatus.isEditMode ? 'Save' : 'Add'}
      </button>
    );
  };

  const handleExportButton = () => {
    const onClickExportButton = (e) => {
      let timeStart = moment(agentStatus.from.value, 'YYYY-MM-DD');
      let timeEnd = moment(agentStatus.to.value, 'YYYY-MM-DD').endOf('day');
      timeStart = timeStart.format();
      timeEnd = timeEnd.format();
      dispatch(
        exportCSVUserStatusDataThunk(
          { timeStart, timeEnd },
          +agentStatus.profile.id,
          +agentStatus.limitResult.value,
          +agentStatus.timeZone.value
        )
      );
    };

    return (
      <button className={`c-button`} onClick={onClickExportButton}>
        Export
      </button>
    );
  };

  const handleModalLeftSide = () => {
    const handleInputAndSelect = (event, inputType) => {
      const { name, value, checked } = event.target;
      switch (inputType) {
        case 'input':
          return dispatch(
            handleAgentStatusDataAC({
              [name]: {
                ...agentStatus[name],
                value,
                errorMessage: '',
              },
            })
          );
        case 'select':
          return dispatch(
            handleAgentStatusDataAC({
              [name]: {
                ...agentStatus[name],
                id: event.target.selectedOptions[0].value,
                value: event.target.selectedOptions[0].label,
                errorMessage: '',
              },
            })
          );
        case 'checkbox':
          return dispatch(
            handleAgentStatusDataAC({
              [name]: checked,
            })
          );

        default:
          break;
      }
    };
    const dateToday = moment().format('YYYY-MM-DD');
    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.TITLE}</div>
          <input
            className="c-input c-input--grey"
            placeholder={DEFAULTS.MODAL.AGENT_STATUS.PLACEHOLDER.TITLE}
            name="title"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={agentStatus.title.value}
          />
          {agentStatus.title.errorMessage && <div className="c-input__error-message">{agentStatus.title.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.PROFILE}</div>
          <select name="profile" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={agentStatus.profile.id}>
            {profilesLocal.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.LIMIT_RESULTS}</div>
          <input
            className="c-input c-input--grey"
            name="limitResult"
            type="number"
            min="1"
            max="100"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={agentStatus.limitResult.value}
          />
          {agentStatus.limitResult.errorMessage && <div className="c-input__error-message">{agentStatus.limitResult.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.TIME_ZONE}</div>
          <select name="timeZone" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={agentStatus.timeZone.id}>
            {DEFAULTS.MODAL.CALL_TRACKING.TIME_ZONE.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.PERIOD}</div>
          <select name="period" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={agentStatus.period.id}>
            {DEFAULTS.MODAL.AGENT_STATUS.PERIOD.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        {agentStatus.period.id === CALL_STATISTIC_PERIOD.WEEK && (
          <div className="c-modal--add-component__input-section">
            <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.START_WEEK}</div>
            <select
              name="startOfWeek"
              className="c-select"
              onChange={(e) => handleInputAndSelect(e, 'select')}
              value={agentStatus.startOfWeek.id}
            >
              {DEFAULTS.MODAL.CALL_TRACKING.START_WEEK.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.SHOW}</div>
          <CheckBox
            className="c-checkbox--margin-bottom"
            checked={agentStatus.isShowStateName}
            name="isShowStateName"
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
            label={DEFAULTS.MODAL.AGENT_STATUS.LABEL.STATE_NAME}
          />
          <CheckBox
            className="c-checkbox--margin-bottom"
            checked={agentStatus.isShowDisplayName}
            name="isShowDisplayName"
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
            label={DEFAULTS.MODAL.AGENT_STATUS.LABEL.STATE_DISPLAY_NAME}
          />
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.INTERVAL_EXPORT}</div>
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.FROM}</div>
          <input
            className="c-input c-input--grey"
            name="from"
            type="date"
            max={agentStatus.to.value || dateToday}
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={agentStatus.from.value}
          />
          {agentStatus.from.errorMessage && <div className="c-input__error-message">{agentStatus.from.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.TO}</div>
          <input
            className="c-input c-input--grey"
            name="to"
            type="date"
            min={agentStatus.from.value}
            max={dateToday}
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={agentStatus.to.value}
          />
          {agentStatus.to.errorMessage && <div className="c-input__error-message">{agentStatus.to.errorMessage}</div>}
        </div>
        {agentStatus.to.value &&
          agentStatus.from.value &&
          new Date(agentStatus.to.value).getTime() - new Date(agentStatus.from.value).getTime() >= 0 && (
            <div className="c-modal__buttons">{handleExportButton()}</div>
          )}
      </div>
    );
  };

  const handleModalRightSide = () => {
    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal--add-component__input-label c-modal--add-component__input-label--grey">
          {DEFAULTS.MODAL.AGENT_STATUS.SECTION_TITLE.PREVIEW}
        </div>
        <div>
          <div className="c-modal__preview-section c-modal__preview-section--agent-login">
            <AgentStatusTable
              isEditMode={false}
              widget={{
                title: agentStatus.title.value,
                profile: {
                  value: agentStatus.profile.value,
                },
                period: {
                  value: agentStatus.period.value,
                },
                limitResult: {
                  value: agentStatus.limitResult.value,
                },
                isShowStateName: agentStatus.isShowStateName,
                isShowDisplayName: agentStatus.isShowDisplayName,
              }}
              tableData={DEFAULTS.MODAL.AGENT_STATUS.TABLE_MOCK_DATA}
            />
          </div>
        </div>
        <div className="c-modal__buttons">
          {handleAddButton()}
          {handleCancelButton()}
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
export default ModalAgentStatus;
