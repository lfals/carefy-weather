import React, { useEffect, useState } from 'react'

function useClock() {

    const [currentTime, setCurrentTime] = useState('');

    function getCurrentHour() {
        var today = new Date();

        const hour =
            today.getHours().toString().length === 1
                ? '0' + today.getHours().toString()
                : today.getHours().toString();

        const minutes =
            today.getMinutes().toString().length === 1
                ? '0' + today.getMinutes().toString()
                : today.getMinutes().toString();

        var time = hour + ':' + minutes;
        return time;
    }

    useEffect(() => {
        setCurrentTime(getCurrentHour());
        setInterval(() => {
            setCurrentTime(getCurrentHour());
        }, 1000);
    }, []);

    return currentTime
}

export default useClock