import React, { useState } from 'react';
import usePreciseTimer from '../utilities/usePreciseTimer';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../reducers/index';
import '../sass/styles.scss';

// type Handler = (timeDelay: number) => void;

// const usePreciseTimer = (handler: Handler, periodInMilliseconds: number, activityFlag: boolean) => {
//   const [timeDelay, setTimeDelay] = useState(1);
//   const savedCallback = useRef<Handler>();
//   const initialTime = useRef<number>();

//   useEffect(() => {
//     savedCallback.current = handler;
//   }, [handler]);

//   useEffect(() => {
//     if (activityFlag) {
//       initialTime.current = new Date().getTime();
//       const id = setInterval(() => {
//         const currentTime = new Date().getTime();
//         const delay = initialTime.current && currentTime - initialTime.current;
//         initialTime.current = currentTime;
//         delay && setTimeDelay(delay / 1000);
//         savedCallback.current && savedCallback.current(timeDelay);
//       }, periodInMilliseconds);

//       return () => {
//         clearInterval(id);
//       };
//     }
//   }, [periodInMilliseconds, activityFlag, timeDelay]);
// };

const Timer = () => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const state = useSelector(state => state);
    const { initialTime } = state;
    const [time, setTime] = useState(0)
    const updateTime = (timeDelay: number) => setTime(time + timeDelay);
    usePreciseTimer(() => updateTime(1), 1000, true, initialTime);

    return (
        <div>
            {time}
        </div>
    );
};

export default Timer;
