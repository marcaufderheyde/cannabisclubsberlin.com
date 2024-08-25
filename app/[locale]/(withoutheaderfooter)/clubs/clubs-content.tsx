'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Navbar from '@/app/Components/Navbar/Navbar';
import MapListFilterSwitcher from '@/app/Components/MapListFilterSwitcher/MapListFilterSwitcher';

const OpenStreetMap = dynamic(
    () => import('@/app/Components/OpenStreetMap/OpenStreetMap'),
    {
        ssr: false,
    }
);

export default function ClubsContent() {
    const [showHRFilter, setShowHRFilter] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div>
            <Navbar isOnMap={true} />
            <div>
                <div className='hidden lg:flex'>
                    <OpenStreetMap
                        showHRInfo={showHRFilter}
                        isDesktopMap={true}
                        isDarkMode={isDarkMode}
                        setIsDarkMode={setIsDarkMode}
                    />
                    <MapListFilterSwitcher
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                    />
                </div>
                <div className='lg:hidden flex'>
                    <OpenStreetMap
                        showHRInfo={showHRFilter}
                        isDesktopMap={false}
                        isDarkMode={isDarkMode}
                        setIsDarkMode={setIsDarkMode}
                    />
                    <MapListFilterSwitcher
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                    />
                </div>
            </div>
        </div>
    );
}
