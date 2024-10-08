'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Navbar from '@/app/components/Navbar/Navbar';
import MapListFilterSwitcher from '@/app/components/MapListFilterSwitcher/MapListFilterSwitcher';

const OpenStreetMap = dynamic(
    () => import('@/app/components/OpenStreetMap/OpenStreetMap'),
    {
        ssr: false,
    }
);

export default function ClubsContent() {
    const [showHRFilter, setShowHRFilter] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div>
            <Navbar isOnMap={true} />
            <div>
                <div className="hidden lg:flex">
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
                <div className="lg:hidden flex">
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
