import { useState, useEffect } from 'react';
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [windowSizeHistory, handleWindowSizeHistory] = useState([]);
  useEffect(() => {
    function handleResize() {
      if (
        !windowSizeHistory.length ||
        Math.abs(windowSizeHistory[windowSizeHistory.length - 1].width - window.innerWidth) > 5 ||
        Math.abs(windowSizeHistory[windowSizeHistory.length - 1].height - window.innerHeight) > 5
      ) {
        const size = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
        handleWindowSizeHistory([...windowSizeHistory, size]);
        setWindowSize(size);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSizeHistory]);
  return windowSize;
}
export default useWindowSize;
