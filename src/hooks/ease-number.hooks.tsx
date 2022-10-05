import React, { useEffect, useState } from 'react'

function useEase() {
    const [number, setNumber] = useState(0);
    const [currentCount, setCurrentCount] = useState(10);
    const [length, setLength] = useState(0)

    useEffect(() => {
        const duration = 6 * 1000
        const frameDuration = 1000 / 60

        const totalFrames = Math.round(duration / frameDuration)
        const easeOut = (x: number) => 4 * x * (1 - x)

        const interval = setInterval(() => {

            setNumber((prevNumber) => prevNumber + 1);
            const progress = easeOut(number / totalFrames)
            setCurrentCount(Math.round(length * progress));

        }, frameDuration);

        if (currentCount >= length) clearInterval(interval);

        return () => clearInterval(interval);

    }, [number, length])

    return { currentCount, setLength }
}

export default useEase