import React, { useEffect, useState } from 'react';
import moment from 'moment';

const TimeInterval = ({ isStop, seconds = 0, ...props }) => {
  const [timeLocal, setTimeLocal] = useState(seconds);
  useEffect(() => {
    let interval;
    if (!isStop) {
      setTimeLocal(seconds);
      interval = setInterval(() => {
        setTimeLocal((t) => t + 1);
      }, [1000]);
    } else {
      setTimeLocal(seconds);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [Math.abs(seconds - timeLocal) > 1]);

  const noOfDays = Math.floor(timeLocal / 86400); // 1 day === 86400 seconds
  const dateString = moment.utc(timeLocal * 1000).format('HH:mm:ss');
  return (
    <span className="timer">{!seconds ? '- - : - - : - -' : noOfDays ? `${noOfDays} Day${noOfDays === 1 ? '' : 's'}` : dateString}</span>
  );
};

export default TimeInterval;
