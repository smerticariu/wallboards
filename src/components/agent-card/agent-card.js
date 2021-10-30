import img from '../../assets/static/images/not_exist_people.png';
import React from 'react';
import { PRESENCE_STATE_KEYS_COLOR } from '../modal/add-component/modal.add-component.defaults';
import { SettingsIcon } from '../../assets/static/icons/settings';
import Dropdown from '../dropdown/dropdown';
import TimeInterval from '../time-interval/time-interval';
const AgentCard = ({ isPreview, name, ext, status, totalTime, callTime, callStatusKey, ...props }) => {
  return (
    <div className={`agent-c agent-c--${PRESENCE_STATE_KEYS_COLOR.CARD_BACKGROUND[callStatusKey]}`}>
      <div className="agent-c__header">
        <div className="agent-c__user">
          <div
            className="agent-c__user-image"
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
          <div className="agent-c__user-name-ext">
            <div className="agent-c__user-name">{name}</div>
            <div className="agent-c__user-ext">Ext: {ext}</div>
          </div>
        </div>
        <div className="agent-c__cog-icon">
          {isPreview ? (
            <SettingsIcon className="i--settings" />
          ) : (
            <Dropdown closeOnClick={true} trigger={<SettingsIcon className="i--settings" />}>
              <div className="c-dropdown__item">Listen live</div>
              <div className="c-dropdown__item">Call agent</div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="agent-c__status-time">
        <div
          className={`agent-c__status agent-c__status--${PRESENCE_STATE_KEYS_COLOR.CARD_AVAILABILITY_STATUS_BACKGROUND[callStatusKey]} agent-c__status--${PRESENCE_STATE_KEYS_COLOR.CARD_AVAILABILITY_STATUS[callStatusKey]}`}
        >
          {status}
        </div>
        <div className={`agent-c__time agent-c__time--${PRESENCE_STATE_KEYS_COLOR.CARD_TOTAL_TIME[callStatusKey]}`}>{totalTime}</div>
      </div>
      <div className="agent-c__body">
        <div className="agent-c__call-time-text">Call time</div>
        <div className="agent-c__call-time-container">
          <div className="agent-c__call-time">
            <TimeInterval seconds={callTime} />
          </div>
        </div>
        <div className="agent-c__footer">{PRESENCE_STATE_KEYS_COLOR.CARD_PRESENCE_STATE_TEXT[callStatusKey]}</div>
      </div>
    </div>
  );
};
export default AgentCard;
