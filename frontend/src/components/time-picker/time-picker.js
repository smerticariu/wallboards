import * as React from 'react';
import useOnClickOutside from '../../common/hooks/useOnClickOutside';
import { createArrayFromTo } from '../../common/utils/generateArray';

const TimePicker = ({ name, isOnTop = false, onChange, labelText, placeholder, disabled, value, ...props }) => {
  const [isTimePopupShow, handleIsShowTimePopup] = React.useState(false);
  const secondsOprions = React.useMemo(
    () =>
      createArrayFromTo(0, 59).map((item) => ({
        key: `${item}`,
        text: `${item < 10 ? 0 : ''}${item}`,
        value: item,
      })),
    []
  );
  const minuteOprions = React.useMemo(
    () =>
      createArrayFromTo(0, 59).map((item) => ({
        key: `${item}`,
        text: `${item < 10 ? 0 : ''}${item}`,
        value: item,
      })),
    []
  );

  const hourOprions = React.useMemo(
    () =>
      createArrayFromTo(0, 23).map((item) => ({
        key: `${item}`,
        text: `${item < 10 ? 0 : ''}${item}`,
        value: item,
      })),
    []
  );

  const inputTimeRef = React.useRef(null);

  useOnClickOutside(inputTimeRef, () => handleIsShowTimePopup(false));
  const [hour, minute, seconds] = value.split(':').map((t) => +t);
  return (
    <div className="time-picker" disabled={disabled}>
      <div ref={inputTimeRef} className="time-picker__ref">
        <div className="time-picker__container">
          <div onClick={() => handleIsShowTimePopup(true)} className="time-picker__input-container">
            <span>
              {hour < 10 ? '0' : ''}
              {hour}
            </span>
            <span>:</span>
            <span>
              {minute < 10 ? '0' : ''}
              {minute}
            </span>
            <span>:</span>
            <span>
              {seconds < 10 ? '0' : ''}
              {seconds}
            </span>
          </div>
          {isTimePopupShow && (
            <div className={`time-picker__popup ${isOnTop ? 'time-picker__popup--top' : ''}`}>
              <div className="time-picker__popup-options">
                {hourOprions.map((time) => {
                  return (
                    <div
                      key={time.value}
                      onClick={() => onChange({ target: { name, value: `${time.value}:${minute}:${seconds}` } })}
                      className={`time-picker__popup-option ${hour === time.value ? 'active' : ''}`}
                    >
                      {time.text}
                    </div>
                  );
                })}
              </div>
              <div className="time-picker__popup-options">
                {minuteOprions.map((time) => {
                  return (
                    <div
                      key={time.value}
                      onClick={() => onChange({ target: { name, value: `${hour}:${time.value}:${seconds}` } })}
                      className={`time-picker__popup-option ${minute === time.value ? 'active' : ''}`}
                    >
                      {time.text}
                    </div>
                  );
                })}
              </div>
              <div className="time-picker__popup-options">
                {secondsOprions.map((time) => {
                  return (
                    <div
                      key={time.value}
                      onClick={() => onChange({ target: { name, value: `${hour}:${minute}:${time.value}` } })}
                      className={`time-picker__popup-option ${seconds === time.value ? 'active' : ''}`}
                    >
                      {time.text}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
