import { useEffect, useRef, useState } from 'react';

type Handler = (timeDelay: number) => void;

const usePreciseTimer = (handler: Handler, periodInMilliseconds: number, activityFlag: boolean, initialTime: number) => {
    const [timeDelay, setTimeDelay] = useState(1);
    const savedCallback = useRef<Handler>();
  
    useEffect(() => {
      savedCallback.current = handler;
    }, [handler]);
  
    useEffect(() => {
      if (activityFlag) {
        const id = setInterval(() => {
          const currentTime = new Date().getTime();
          const delay = initialTime && currentTime - initialTime;
          initialTime = currentTime;
          delay && setTimeDelay(delay / 1000);
          savedCallback.current && savedCallback.current(timeDelay);
        }, periodInMilliseconds);
  
        return () => {
          clearInterval(id);
        };
      }
    }, [periodInMilliseconds, activityFlag, timeDelay]);
  };

  export default usePreciseTimer;
