import moment from 'moment';
export const getTimes = (widget) => {
  var period = { timeStart: 0, timeEnd: 0 };
  const timeNow = moment.utc();
  var start = moment.utc(timeNow);
  var end = moment.utc(timeNow).utcOffset(widget.timeZone.id).endOf('day');
  switch (widget.period.id) {
    case 'hour':
      start.startOf('hour').format();
      break;
    case 'today':
      start.utcOffset(widget.timeZone.id).startOf('day').format();
      break;
    case 'week':
      start.utcOffset(widget.timeZone.id).startOf('isoWeek').add(widget.startOfWeek.id, 'day');
      if (start.isAfter(moment.utc(timeNow).utcOffset(widget.timeZone.id))) {
        start.subtract(7, 'day');
      }
      break;
    case 'month':
      start.utcOffset(widget.timeZone.id).startOf('month').format();
      break;
    case 'year':
      start.utcOffset(widget.timeZone.id).startOf('year').format();
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
