import React from 'react';
import { useDispatch } from 'react-redux';
import { SettingsIcon } from '../../assets/static/icons/settings';
import Dropdown from '../dropdown/dropdown';
import TimeInterval from '../time-interval/time-interval';
import { callAgentThunk, listenLiveThunk } from '../../store/thunk/agents.thunk';
import { DEFAULTS } from '../../common/defaults/defaults';

const AgentCard = ({
  id,
  availabilityStatesList = [],
  handleAgentAvailabilityState,
  isPreview,
  name,
  ext,
  status,
  totalTime,
  callTime,
  callStatusKey,
  canCallAgents,
  canListenLive,
  canChangeAvailabilityState,
  ...props
}) => {
  const dispatch = useDispatch();

  const handleCallAgent = () => {
    dispatch(callAgentThunk(id));
  };

  const handleListenLive = () => {
    dispatch(listenLiveThunk(id));
  };

  return (
    <div className={`agent-c agent-c--${DEFAULTS.MODAL.ADD_COMPONENT.PRESENCE_STATE_KEYS_COLOR.CARD_BACKGROUND[callStatusKey]}`}>
      <div className="agent-c__header">
        <div className="agent-c__user">
          {/* <div
            className="agent-c__user-image"
            //do not delete
            // style={{
            //   backgroundImage: `url(${img})`,
            // }}
          /> */}
          <div className="agent-c__user-name-ext">
            <div className="agent-c__user-name">
              {name.length > DEFAULTS.GRID.MAX_NAME_CHARACTERS ? (
                <Dropdown
                  openOnHover={true}
                  closeOnHover={true}
                  containerClassName={'c-dropdown__container--agent-name'}
                  trigger={<div className="c-dropdown__trigger--agent-name">{name}</div>}
                >
                  <div className="c-dropdown--agent-name">{name}</div>
                </Dropdown>
              ) : (
                name
              )}
            </div>
            <div className="agent-c__user-ext">Ext: {ext}</div>
          </div>
        </div>
        <div className="agent-c__cog-icon">
          {isPreview || (!canListenLive && !canCallAgents) ? (
            <SettingsIcon className="i--settings" />
          ) : (
            <Dropdown closeOnClick={true} trigger={<SettingsIcon className="i--settings" />}>
              {canListenLive && (
                <div
                  className="c-dropdown__item"
                  onClick={() => {
                    handleListenLive();
                  }}
                >
                  Listen live
                </div>
              )}
              {canCallAgents && (
                <div
                  onClick={() => {
                    handleCallAgent();
                  }}
                  className="c-dropdown__item"
                >
                  Call agent
                </div>
              )}
            </Dropdown>
          )}
        </div>
      </div>
      <div className="agent-c__status-time">
        <div
          className={`agent-c__status ${
            availabilityStatesList.length && canChangeAvailabilityState ? 'agent-c__status--dropdown' : ''
          } agent-c__status--${
            DEFAULTS.MODAL.ADD_COMPONENT.PRESENCE_STATE_KEYS_COLOR.CARD_AVAILABILITY_STATUS_BACKGROUND[callStatusKey]
          } agent-c__status--${DEFAULTS.MODAL.ADD_COMPONENT.PRESENCE_STATE_KEYS_COLOR.CARD_AVAILABILITY_STATUS[callStatusKey]}`}
        >
          {availabilityStatesList.length && canChangeAvailabilityState ? (
            <Dropdown
              className="c-dropdown--availability-state"
              closeOnClick={true}
              containerClassName="c-dropdown__container--availability"
              trigger={
                <div className="c-dropdown__trigger--agent-name agent-t__arrow-container agent-t__arrow-container--card">{status}</div>
              }
            >
              {availabilityStatesList.map((state) => (
                <div
                  key={`${state.availabilityProfileId} ${state.availabilityStateId}`}
                  onClick={() =>
                    handleAgentAvailabilityState(id, state.availabilityProfileId, state.availabilityStateId, state.availabilityStateName)
                  }
                  className="c-dropdown__item"
                >
                  {state.availabilityStateDisplayName}
                </div>
              ))}
            </Dropdown>
          ) : (
            status
          )}
        </div>
        <div
          className={`agent-c__time agent-c__time--${DEFAULTS.MODAL.ADD_COMPONENT.PRESENCE_STATE_KEYS_COLOR.CARD_TOTAL_TIME[callStatusKey]}`}
        >
          {isPreview ? '00:00:00' : <TimeInterval seconds={totalTime} />}
        </div>
      </div>
      <div className="agent-c__body">
        <div className="agent-c__call-time-text">Call time</div>
        <div className="agent-c__call-time-container">
          <div className="agent-c__call-time">
            <TimeInterval seconds={callTime} />
          </div>
        </div>
        <div className="agent-c__footer">
          {DEFAULTS.MODAL.ADD_COMPONENT.PRESENCE_STATE_KEYS_COLOR.CARD_PRESENCE_STATE_TEXT[callStatusKey]}
        </div>
      </div>
    </div>
  );
};
export default AgentCard;
