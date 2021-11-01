import React, { useEffect, useState } from 'react';

const TimeInterval = ({ seconds, ...props }) => {
  const [timeLocal, setTimeLocal] = useState(seconds);
  useEffect(() => {
    let interval;

    if (seconds) {
      setTimeLocal(seconds);
      interval = setInterval(() => {
        setTimeLocal((t) => t + 1);
      }, [1000]);
    }
    return () => clearInterval(interval);
  }, [seconds]);
  return <>{!seconds ? '- - : - - : - -' : new Date(timeLocal * 1000).toISOString().substr(11, 8)}</>;
};

export default TimeInterval;
