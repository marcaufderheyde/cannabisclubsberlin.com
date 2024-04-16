'use client';
import { useEffect, useState } from 'react';

interface Window {
    width: number | undefined;
    height: number | undefined;
}

export default function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

    const initWindow: Window = {
        width: window.outerWidth,
        height: window.outerHeight,
    };
    const [windowSize, setWindowSize] = useState(initWindow);

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.outerWidth,
                height: window.outerWidth,
            });
        }

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
