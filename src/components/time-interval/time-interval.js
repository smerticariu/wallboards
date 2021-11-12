import React, { useEffect, useState } from 'react';
import moment from '../../../node_modules/moment/moment';

const TimeInterval = ({ seconds, ...props }) => {
  const [timeLocal, setTimeLocal] = useState(seconds);
  useEffect(() => {
    let interval;
    setTimeLocal(seconds);
    interval = setInterval(() => {
      setTimeLocal((t) => t + 1);
    }, [1000]);
    return () => clearInterval(interval);
  }, [seconds]);

  const noOfDays = Math.floor(timeLocal / 86400);
  const dateString = moment.utc(timeLocal * 1000).format('HH:mm:ss');
  return (
    <span className="timer">{!seconds ? '- - : - - : - -' : noOfDays ? `${noOfDays} Day${noOfDays === 1 ? '' : 's'}` : dateString}</span>
  );
};

export default TimeInterval;
