import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CALL_DIRECTION } from '../../../common/defaults/modal.defaults';
import { getCallsInitialValues } from '../../../common/defaults/wallboards.defaults';
import WidgetContainer from './widget-container';

const GridCallStatus = ({ isEditMode, widget, ...props }) => {
  const calls = useSelector((state) => state.agents.callsWithGroup);
  const [noOfCalls, handleNoOfCalls] = useState({ ...getCallsInitialValues() });
  useEffect(() => {
    let noOfCallsCopy = { ...getCallsInitialValues() };
    calls.forEach((call) => {
      switch (call.direction) {
        case CALL_DIRECTION.INBOUND:
          noOfCallsCopy.inbound.prevalue++;
          break;
        case CALL_DIRECTION.OUTBOUND:
          noOfCallsCopy.outbound.prevalue++;
          break;
        case CALL_DIRECTION.INTERNAL:
          noOfCallsCopy.internal.value++;
          break;
        case CALL_DIRECTION.INCOMING:
          noOfCallsCopy.inbound.value++;
          break;
        case CALL_DIRECTION.OUTGOING:
          noOfCallsCopy.outbound.value++;
          break;
        case CALL_DIRECTION.RELAYED:
          noOfCallsCopy.relayed.value++;
          break;
        case CALL_DIRECTION.FEATURE:
          noOfCallsCopy.feature.value++;
          break;
        default:
          noOfCallsCopy.uncategorised.value++;
      }
    });
    handleNoOfCalls(noOfCallsCopy);
  }, [calls]);

  return (
    <WidgetContainer widget={widget} isEditMode={isEditMode}>
      <div className={`widget__body widget__body--call-status`}>
        {Object.keys(noOfCalls).map((key) => (
          <div key={key} className="widget__call-status-row">
            <div className="widget__call-status-title">{key}</div>
            <div
              className={`widget__call-status-data ${noOfCalls[key].prevalue !== undefined ? 'widget__call-status-data--two-columns' : ''}`}
            >
              {Object.keys(noOfCalls[key]).map((valueKey, index) => (
                <div
                  key={valueKey}
                  className={`widget__call-status-data__column ${!index ? '' : 'widget__call-status-data__column--grey'}`}
                >
                  {noOfCalls[key][valueKey]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};
export default GridCallStatus;
