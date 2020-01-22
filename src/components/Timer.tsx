import React, { useState } from 'react';
import '../sass/styles.scss';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    setInterval(() => setSeconds(seconds + 1), 1000);
    return (
        <div>
            {seconds}
        </div>
    );
};

export default Timer;
