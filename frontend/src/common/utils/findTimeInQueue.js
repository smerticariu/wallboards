import moment from 'moment';
export const findTimeInQueue = (call, activeCalls) => {
  const timeNow = moment.utc();
  try {
    var start = moment.utc(call.created);
    var end = moment.utc(timeNow);
    if (call.status.toLowerCase() === 'bridged' || call.status.toLowerCase() === 'connected') {
      if (
        activeCalls.hasOwnProperty(call.uuid) &&
        activeCalls[call.uuid].hasOwnProperty('answerTime') &&
        activeCalls[call.uuid].answerTime != null
      ) {
        end = moment.utc(activeCalls[call.uuid].answerTime);
      }
    }
    return end.diff(start, 'second');
  } catch (e) {
    return 0;
  }
};
