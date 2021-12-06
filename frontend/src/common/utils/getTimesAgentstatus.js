import moment from 'moment';
export const getTimesAgentstatus = (widget) => {
  let period = { timeStart: 0, timeEnd: 0 };
  let timeNow = moment.utc();
  let timeStart = moment.utc(timeNow);
  let timeEnd = moment
    .utc(timeNow)
    .utcOffset(+widget.timeZone.id)
    .endOf('day');
  switch (widget.period.id) {
    case 'hour':
      timeStart.startOf('hour').format();
      break;
    case 'today':
      timeStart
        .utcOffset(+widget.timeZone.id)
        .startOf('day')
        .format();
      break;
    case 'week':
      timeStart
        .utcOffset(+widget.timeZone.id)
        .startOf('isoWeek')
        .add(widget.startOfWeek.id, 'day');
      if (timeStart.isAfter(moment.utc(timeNow).utcOffset(+widget.timeZone.id))) {
        timeStart.subtract(7, 'day');
      }
      break;
    case 'month':
      timeStart
        .utcOffset(+widget.timeZone.id)
        .startOf('month')
        .format();
      break;
    case 'year':
      timeStart
        .utcOffset(+widget.timeZone.id)
        .startOf('year')
        .format();
      break;
    case 'rolling-hour':
      timeStart = timeStart.subtract(1, 'hour').startOf('minute');
      break;
    default:
      break;
  }
  period.timeStart = timeStart.format();
  period.timeEnd = timeEnd.format();
  return period;
};
