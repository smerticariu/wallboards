import moment from 'moment';
export const getTimesCallTracking = (widget) => {
  let timeStart = moment().utcOffset(Number(widget.timeZone.id));
  let timeEnd = moment().utcOffset(Number(widget.timeZone.id)).endOf('day');
  switch (widget.period.id) {
    case 'hour':
      timeStart.startOf('hour').format();
      break;
    case 'today':
      timeStart.startOf('day').format();
      break;
    case 'week':
      timeStart.startOf('isoWeek').add(Number(widget.startOfWeek.id), 'day');
      if (timeStart.isAfter(moment().utcOffset(Number(widget.timeZone.id)))) {
        timeStart.subtract(7, 'day');
      }
      break;
    case 'rolling-hour':
      timeStart = timeStart.subtract(1, 'hour').startOf('minute');
      break;
    default:
      return null;
  }
  return { timeEnd: timeEnd.format(), timeStart: timeStart.format() };
};
