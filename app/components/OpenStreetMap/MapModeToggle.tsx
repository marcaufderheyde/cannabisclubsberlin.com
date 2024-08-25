import React from 'react';
import { Moon, Sun } from 'lucide-react';

type MapModeToggleProps = {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const MapModeToggle: React.FC<MapModeToggleProps> = ({
    isDarkMode,
    setIsDarkMode,
}) => {
    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className='absolute bottom-4 left-4 z-[3000] bg-white rounded-full p-2 shadow-md'
            aria-label={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
        >
            {isDarkMode ? (
                <Sun className='w-6 h-6 text-yellow-500' />
            ) : (
                <Moon className='w-6 h-6 text-gray-700' />
            )}
        </button>
    );
};

export default MapModeToggle;
