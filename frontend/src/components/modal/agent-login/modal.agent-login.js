import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { addWallboardAgentLoginAC } from '../../../store/actions/wallboards.action';
import { handleAgentLoginDataAC, handleWallboardActiveModalAC, resetNewWidgetModalFormDataAC } from '../../../store/actions/modal.action';
import moment from 'moment';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { exportCSVUserLoginDataThunk, fetchUserGroupsThunk } from '../../../store/thunk/agents.thunk';
import { CALL_STATISTIC_PERIOD } from '../../../common/defaults/modal.defaults';
import AgentLoginTable from '../../tables/table.agent-login';

const ModalAgentLogin = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const agentLogin = useSelector((state) => state.modal.agentLogin);
  const { userInfo } = useSelector((state) => state.login);
  const userGroups = useSelector((state) => state.agents.userGroups);
  const [userGroupsLocal, setUserGroupsLocal] = useState([{ ...DEFAULTS.MODAL.CALL_TRACKING.USER_GROUP }]);

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
      let existErrors = false;
      if (!checkIsAlphanumeric(agentLogin.title.value)) {
        dispatch(
          handleAgentLoginDataAC({
            title: {
              ...agentLogin.title,
              errorMessage: DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE,
            },
          })
        );
        existErrors = true;
      }
      if (isNaN(agentLogin.limitResult.value) || agentLogin.limitResult.value < 1) {
        dispatch(
          handleAgentLoginDataAC({
            limitResult: {
              ...agentLogin.limitResult,
              errorMessage: DEFAULTS.MODAL.MESSAGES.MIN_VALUE,
            },
          })
        );
        existErrors = true;
      }
      if (isNaN(agentLogin.limitResult.value) || agentLogin.limitResult.value > 100) {
        dispatch(
          handleAgentLoginDataAC({
            limitResult: {
              ...agentLogin.limitResult,
              errorMessage: DEFAULTS.MODAL.MESSAGES.MAX_VALUE,
            },
          })
        );
        existErrors = true;
      }
      if (existErrors) return;
      dispatch(addWallboardAgentLoginAC(agentLogin, userInfo));
      closeModal();
    };

    return (
      <button className="c-button c-button--blue c-button--m-left" onClick={onClickAddButton}>
        {agentLogin.isEditMode ? 'Save' : 'Add'}
      </button>
    );
  };

  const handleExportButton = () => {
    const onClickExportButton = (e) => {
      let timeStart = moment(agentLogin.from.value).utcOffset(agentLogin.timeZone.id);
      let timeEnd = moment(agentLogin.to.value).utcOffset(agentLogin.timeZone.id).endOf('day');
      timeStart = timeStart.format();
      timeEnd = timeEnd.format();
      dispatch(exportCSVUserLoginDataThunk({ timeStart, timeEnd }, +agentLogin.timeZone.id, +agentLogin.group.id));
    };

    return (
      <button className={`c-button`} onClick={onClickExportButton}>
        Export
      </button>
    );
  };

  const handleModalLeftSide = () => {
    const handleInputAndSelect = (event, inputType) => {
      const { name, value } = event.target;
      switch (inputType) {
        case 'input':
          return dispatch(
            handleAgentLoginDataAC({
              [name]: {
                ...agentLogin[name],
                value,
                errorMessage: '',
              },
            })
          );
        case 'select':
          return dispatch(
            handleAgentLoginDataAC({
              [name]: {
                ...agentLogin[name],
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
    const dateToday = moment().format('YYYY-MM-DD');
    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.TITLE}</div>
          <input
            className="c-input c-input--grey"
            placeholder={DEFAULTS.MODAL.AGENT_LOGIN.PLACEHOLDER.TITLE}
            name="title"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={agentLogin.title.value}
          />
          {agentLogin.title.errorMessage && <div className="c-input__error-message">{agentLogin.title.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.GROUP}</div>
          <select name="group" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={agentLogin.group.id}>
            {userGroupsLocal.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.LIMIT_RESULTS}</div>
          <input
            className="c-input c-input--grey"
            name="limitResult"
            type="number"
            min="1"
            max="100"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={agentLogin.limitResult.value}
          />
          {agentLogin.limitResult.errorMessage && <div className="c-input__error-message">{agentLogin.limitResult.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.TIME_ZONE}</div>
          <select name="timeZone" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={agentLogin.timeZone.id}>
            {DEFAULTS.MODAL.CALL_TRACKING.TIME_ZONE.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_TRACKING.SECTION_TITLE.PERIOD}</div>
          <select name="period" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={agentLogin.period.id}>
            {DEFAULTS.MODAL.AGENT_LOGIN.PERIOD.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        {agentLogin.period.id === CALL_STATISTIC_PERIOD.WEEK && (
          <div className="c-modal--add-component__input-section">
            <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.START_WEEK}</div>
            <select
              name="startOfWeek"
              className="c-select"
              onChange={(e) => handleInputAndSelect(e, 'select')}
              value={agentLogin.startOfWeek.id}
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
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.INTERVAL_EXPORT}</div>
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.FROM}</div>
          <input
            className="c-input c-input--grey"
            name="from"
            type="date"
            max={agentLogin.to.value || dateToday}
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={agentLogin.from.value}
          />
          {agentLogin.from.errorMessage && <div className="c-input__error-message">{agentLogin.from.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.TO}</div>
          <input
            className="c-input c-input--grey"
            name="to"
            type="date"
            min={agentLogin.from.value}
            max={dateToday}
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={agentLogin.to.value}
          />
          {agentLogin.to.errorMessage && <div className="c-input__error-message">{agentLogin.to.errorMessage}</div>}
        </div>
        {agentLogin.to.value &&
          agentLogin.from.value &&
          new Date(agentLogin.to.value).getTime() - new Date(agentLogin.from.value).getTime() >= 0 && (
            <div className="c-modal__buttons">{handleExportButton()}</div>
          )}
      </div>
    );
  };

  const handleModalRightSide = () => {
    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal--add-component__input-label c-modal--add-component__input-label--grey">
          {DEFAULTS.MODAL.AGENT_LOGIN.SECTION_TITLE.PREVIEW}
        </div>
        <div className="c-modal__preview-section c-modal__preview-section--agent-login">
          <AgentLoginTable
            isEditMode={false}
            widget={{
              title: agentLogin.title.value,
              group: {
                value: agentLogin.group.value,
              },
              limitResult: {
                value: agentLogin.limitResult.value,
              },
            }}
            tableData={DEFAULTS.MODAL.AGENT_LOGIN.TABLE_MOCK_DATA}
          />
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
            <div className="c-modal__title">{agentLogin.isEditMode ? 'Edit' : 'Add'} Component</div>
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
export default ModalAgentLogin;
