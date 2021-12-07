import moment from 'moment';
export const getTimesCallTracking = (widget) => {
  var period = { timeStart: 0, timeEnd: 0 };
  var start = moment().utcOffset(+widget.timeZone.id);
  var end = moment()
    .utcOffset(+widget.timeZone.id)
    .endOf('day');
  switch (widget.period.id) {
    case 'hour':
      start.startOf('hour').format();
      break;
    case 'today':
      start.startOf('day').format();
      break;
    case 'week':
      start.startOf('isoWeek').add(widget.startOfWeek.id, 'day');
      if (start.isAfter(moment().utcOffset(+widget.timeZone.id))) {
        start.subtract(7, 'day');
      }
      break;
    case 'rolling-hour':
      start = start.subtract(1, 'hour').startOf('minute');
      break;
    default:
      break;
  }
  period.timeStart = start.format();
  period.timeEnd = end.format();
  return period;
};
