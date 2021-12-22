import React from 'react';
import { useSelector } from 'react-redux';
import { getQueueTrackingInitialValues, getQueueTrackingUtilityFields } from '../../../common/defaults/wallboards.defaults';
import { averageValue } from '../../../common/utils/averageValue';
import { maxValue } from '../../../common/utils/maxValueValue';
import { percentValue } from '../../../common/utils/percentValue';
import TimeInterval from '../../time-interval/time-interval';
import moment from 'moment';
import WidgetContainer from './widget-container';

const GridQueueTracking = ({ isEditMode, isPreview, widget, ...props }) => {
  const callQueueStatistic = useSelector((state) => state.callsQueues.callQueueStatistic);

  const getQueueTrackingStatistic = () => {
    let queueTrackingInitialValues = { ...getQueueTrackingInitialValues() };
    let queueTrackingUtilityFields = { ...getQueueTrackingUtilityFields() };
    const widgetCallQueueStatistic = callQueueStatistic.find((calls) => calls.widgetId === widget.id);
    if (!widgetCallQueueStatistic) return queueTrackingInitialValues;

    widgetCallQueueStatistic.callQueueStatistic.forEach((value) => {
      queueTrackingInitialValues.newCallCount.value += value.newCallCount;
      queueTrackingInitialValues.answeredCallCount.value += value.answeredCallCount;
      queueTrackingInitialValues.hungUpCallCount.value += value.hungUpCallCount;
      queueTrackingInitialValues.timedOutCallCount.value += value.timedOutCallCount;
      queueTrackingInitialValues.abortedCallCount.value += value.abortedCallCount;

      //do not remove
      // if (widget.solidCallsOverride.isChecked) {
      // if (moment(widget.solidCallsOverride.value, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds') < value.totalTalkTime) {
      queueTrackingInitialValues.solidCallCount.value += value.solidCallCount;
      //   }
      // } else {
      //   queueTrackingInitialValues.solidCallCount.value += value.solidCallCount;
      // }

      //utilities
      queueTrackingUtilityFields.totalTalkTime.value += value.totalTalkTime;
      queueTrackingUtilityFields.answeredCallTotalWaitTime.value += value.answeredCallTotalWaitTime;
      queueTrackingUtilityFields.hungUpCallTotalWaitTime.value += value.hungUpCallTotalWaitTime;
      queueTrackingUtilityFields.timedOutCallTotalWaitTime.value += value.timedOutCallTotalWaitTime;
      queueTrackingUtilityFields.abortedCallTotalWaitTime.value += value.abortedCallTotalWaitTime;

      queueTrackingInitialValues.maxWaitTime.value.push(value.maxWaitTime);
    });

    queueTrackingInitialValues.totalCallCount.value =
      queueTrackingInitialValues.answeredCallCount.value +
      queueTrackingInitialValues.timedOutCallCount.value +
      queueTrackingInitialValues.hungUpCallCount.value +
      queueTrackingInitialValues.abortedCallCount.value;

    //calculate percentages
    queueTrackingInitialValues.answeredCallCount.percent.value = percentValue(
      queueTrackingInitialValues.answeredCallCount.value,
      queueTrackingInitialValues.totalCallCount.value
    );
    queueTrackingInitialValues.hungUpCallCount.percent.value = percentValue(
      queueTrackingInitialValues.hungUpCallCount.value,
      queueTrackingInitialValues.totalCallCount.value
    );
    if (widget.abandonedCallSLA.isChecked && queueTrackingInitialValues.hungUpCallCount.percent.value >= widget.abandonedCallSLA.value) {
      queueTrackingInitialValues.hungUpCallCount.isRed = true;
    }
    queueTrackingInitialValues.timedOutCallCount.percent.value = percentValue(
      queueTrackingInitialValues.timedOutCallCount.value,
      queueTrackingInitialValues.totalCallCount.value
    );
    queueTrackingInitialValues.abortedCallCount.percent.value = percentValue(
      queueTrackingInitialValues.abortedCallCount.value,
      queueTrackingInitialValues.totalCallCount.value
    );
    queueTrackingInitialValues.solidCallCount.percent.value = percentValue(
      queueTrackingInitialValues.solidCallCount.value,
      queueTrackingInitialValues.totalCallCount.value
    );
    //calculate max
    queueTrackingInitialValues.maxWaitTime.value = maxValue(queueTrackingInitialValues.maxWaitTime.value);
    //calculate averages
    queueTrackingInitialValues.averageTalkTime.value = averageValue(
      queueTrackingUtilityFields.totalTalkTime.value,
      queueTrackingInitialValues.answeredCallCount.value
    );
    queueTrackingInitialValues.averageWaitTime.value = averageValue(
      queueTrackingUtilityFields.answeredCallTotalWaitTime.value +
        queueTrackingUtilityFields.hungUpCallTotalWaitTime.value +
        queueTrackingUtilityFields.timedOutCallTotalWaitTime.value +
        queueTrackingUtilityFields.abortedCallTotalWaitTime.value,
      queueTrackingInitialValues.answeredCallCount.value +
        queueTrackingInitialValues.hungUpCallCount.value +
        queueTrackingInitialValues.timedOutCallCount.value +
        queueTrackingInitialValues.abortedCallCount.value
    );
    if (
      widget.averageWaitSLA.isChecked &&
      queueTrackingInitialValues.averageWaitTime.value >=
        moment(widget.averageWaitSLA.value, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds')
    ) {
      queueTrackingInitialValues.averageWaitTime.isRed = true;
    }
    return queueTrackingInitialValues;
  };
  const queueTrackingStatistic = getQueueTrackingStatistic();

  return (
    <WidgetContainer isEditMode={isEditMode} widget={widget}>
      <div className={`widget__body widget__body--call-status`}>
        {Object.keys(queueTrackingStatistic)
          .filter((key) => widget.columnsToViewOptions.selectedItems.includes(queueTrackingStatistic[key].id))
          .map((key) => (
            <div
              key={key}
              className={`widget__call-status-row widget__call-status-row--queue-tracking ${
                queueTrackingStatistic[key].isRed ? 'widget__call-status-row--red' : ''
              }`}
            >
              <div className="widget__call-status-title">{queueTrackingStatistic[key].name}</div>
              <div
                className={`widget__call-status-data ${queueTrackingStatistic[key].percent ? 'widget__call-status-data--two-columns' : ''}`}
              >
                <div className="widget__call-status-data__column">
                  {queueTrackingStatistic[key].format === 'duration' ? (
                    <TimeInterval isStop={true} seconds={queueTrackingStatistic[key].value} />
                  ) : (
                    queueTrackingStatistic[key].value
                  )}
                </div>
                {queueTrackingStatistic[key].percent && (
                  <div className="widget__call-status-data__column widget__call-status-data__column--blue">
                    {queueTrackingStatistic[key].percent.value}%
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </WidgetContainer>
  );
};
export default GridQueueTracking;
