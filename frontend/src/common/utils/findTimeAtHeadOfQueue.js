import moment from 'moment';

export const findTimeAtHeadOfQueue = (call, activeCalls) => {
  const timeNow = moment.utc();

  try {
    if (call == null || call.reachedHeadOfQueue == null) {
      return 0;
    }
    let start = moment.utc(call.reachedHeadOfQueue);
    let end = moment.utc(timeNow);
    if (call.status === 'bridged' || call.status === 'connected') {
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
