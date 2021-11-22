import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import { SettingsIcon } from '../../../assets/static/icons/settings';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { fetchCallStatisticThunk } from '../../../store/thunk/callsQueues.thunk';
import { CALL_CATEGORY_OPTIONS } from '../../../common/defaults/modal.defaults';
import { averageValue } from '../../../common/utils/averageValue';
import TimeInterval from '../../time-interval/time-interval';
import { getCallTrackingInitialValues } from '../../../common/defaults/wallboards.defaults';
import { getTimesCallTracking } from '../../../common/utils/getTimesCallTracking';
const GridCallTracking = ({ isPreview, isEditMode, widget, ...props }) => {
  const dispatch = useDispatch();

  const callsStatistic = useSelector((state) => state.callsQueues.callsStatistic);

  useEffect(() => {
    if (!isPreview) {
      dispatch(fetchCallStatisticThunk(getTimesCallTracking(widget), widget.id));
      const interval = setInterval(() => {
        dispatch(fetchCallStatisticThunk(getTimesCallTracking(widget), widget.id));
      }, [2000]);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [widget]);

  const getTimesData = () => {
    let aggregateData = getCallTrackingInitialValues();

    const widgetCallsStatistic = callsStatistic.find((calls) => calls.widgetId === widget.id);

    if (!widgetCallsStatistic) return aggregateData[widget.callCategory.id];
    widgetCallsStatistic.callsStatistic
      .filter((call) => (Number(widget.group.id) === -1 ? true : call.groupId === Number(widget.group.id)))
      .forEach((call) => {
        //outbound
        switch (widget.callCategory.id) {
          case CALL_CATEGORY_OPTIONS.outbound: {
            aggregateData.outbound.outboundUnConnectedCallCount.value += call.outboundUnansweredCallCount + call.outboundAnsweredCallCount;
            aggregateData.outbound.outboundConnectedCallCount.value += call.outboundConnectedCallCount;
            aggregateData.outbound.outboundSolidCallCount.value += call.outboundSolidCallCount;
            aggregateData.outbound.outboundTotalTalkTime.value += call.outboundTotalTalkTime;
            break;
          }
          //inbound
          case CALL_CATEGORY_OPTIONS.inbound: {
            aggregateData.inbound.inboundUnansweredCallCount.value += call.inboundUnansweredCallCount;
            aggregateData.inbound.inboundAnsweredCallCount.value += call.inboundAnsweredCallCount;
            aggregateData.inbound.inboundConnectedCallCount.value += call.inboundConnectedCallCount;
            aggregateData.inbound.inboundSolidCallCount.value += call.inboundSolidCallCount;
            aggregateData.inbound.inboundTotalTalkTime.value += call.inboundTotalTalkTime;
            aggregateData.inbound.inboundTotalWaitTime.value += call.inboundTotalWaitTime;
            break;
          }
          //originated
          case CALL_CATEGORY_OPTIONS.originated: {
            aggregateData.originated.originatedConnectedCallCount.value += call.originatedConnectedCallCount;
            aggregateData.originated.originatedSolidCallCount.value += call.originatedSolidCallCount;
            aggregateData.originated.originatedTotalTalkTime.value += call.originatedTotalTalkTime;
            break;
          }
          //received
          case CALL_CATEGORY_OPTIONS.received: {
            aggregateData.received.receivedConnectedCallCount.value += call.receivedConnectedCallCount;
            aggregateData.received.receivedSolidCallCount.value += call.receivedSolidCallCount;
            aggregateData.received.receivedTotalTalkTime.value += call.receivedTotalTalkTime;
            break;
          }
          //service
          case CALL_CATEGORY_OPTIONS.service: {
            aggregateData.service.serviceConnectedCallCount.value += call.serviceConnectedCallCount;
            aggregateData.service.serviceTotalTalkTime.value += call.serviceTotalTalkTime;
            break;
          }
          default:
            break;
        }
      });
    switch (widget.callCategory.id) {
      case CALL_CATEGORY_OPTIONS.outbound: {
        aggregateData.outbound.outboundAverageTalkTime.value = averageValue(
          aggregateData.outbound.outboundTotalTalkTime.value,
          aggregateData.outbound.outboundConnectedCallCount.value
        );
        break;
      }
      case CALL_CATEGORY_OPTIONS.inbound: {
        aggregateData.inbound.inboundAverageTalkTime.value = averageValue(
          aggregateData.inbound.inboundTotalTalkTime.value,
          aggregateData.inbound.inboundConnectedCallCount.value
        );
        aggregateData.inbound.inboundAverageWaitTime.value = averageValue(
          aggregateData.inbound.inboundTotalWaitTime.value,
          aggregateData.inbound.inboundUnansweredCallCount.value +
            aggregateData.inbound.inboundAnsweredCallCount.value +
            aggregateData.inbound.inboundConnectedCallCount.value
        );
        break;
      }
      case CALL_CATEGORY_OPTIONS.originated: {
        aggregateData.originated.originatedAverageTalkTime.value = averageValue(
          aggregateData.originated.originatedTotalTalkTime.value,
          aggregateData.originated.originatedConnectedCallCount.value
        );
        break;
      }
      case CALL_CATEGORY_OPTIONS.received: {
        aggregateData.received.receivedAverageTalkTime.value = averageValue(
          aggregateData.received.receivedTotalTalkTime.value,
          aggregateData.received.receivedConnectedCallCount.value
        );
        break;
      }
      case CALL_CATEGORY_OPTIONS.service: {
        aggregateData.service.serviceAverageTalkTime.value = averageValue(
          aggregateData.service.serviceTotalTalkTime.value,
          aggregateData.service.serviceConnectedCallCount.value
        );
        break;
      }
      default:
        break;
    }
    return aggregateData[widget.callCategory.id];
  };
  const callTrackingTableData = getTimesData();

  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.CALL_TRACKING));
    };

    return (
      <div onClick={onEditClick} className="widget__edit-icon">
        <SettingsIcon className="i--settings i--settings--call-status" />
      </div>
    );
  };

  const handleDeleteIcon = () => {
    const onDeleteClick = () => {
      dispatch(setWallboardComponentForDeleteAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD_COMPONENT));
    };
    return (
      <div onClick={onDeleteClick} className="widget__delete-icon">
        <CloseIcon className="i--close i--close--small" />
      </div>
    );
  };
  return (
    <div className="widget">
      <div className="widget__header">
        <div className="widget__title">
          <div className="widget__title--bold">{widget.title}: </div>
          {widget.callQueue.value}
        </div>
        <div className="widget__icons">
          {isEditMode && (
            <>
              {handleEditIcon()}
              {handleDeleteIcon()}
            </>
          )}
        </div>
      </div>
      <div className={`widget__body widget__body--call-status`}>
        {Object.keys(callTrackingTableData).map((key) => (
          <div key={key} className="widget__call-status-row">
            <div className="widget__call-status-title">{callTrackingTableData[key].name}</div>
            <div className="widget__call-status-data">
              <div className={`widget__call-status-data__column widget__call-status-data__column`}>
                {callTrackingTableData[key].format === 'duration' ? (
                  <TimeInterval isStop={true} seconds={callTrackingTableData[key].value} />
                ) : (
                  callTrackingTableData[key].value
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GridCallTracking;
