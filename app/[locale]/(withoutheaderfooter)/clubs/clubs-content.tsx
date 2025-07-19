'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Navbar from '@/app/components/Navbar/Navbar';
import MapListFilterSwitcher from '@/app/components/MapListFilterSwitcher/MapListFilterSwitcher';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';

const OpenStreetMap = dynamic(
    () => import('@/app/components/OpenStreetMap/OpenStreetMap'),
    {
        ssr: false,
    }
);

export default function ClubsContent() {
    const [showHRFilter, setShowHRFilter] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [externalClubSelectHandler, setExternalClubSelectHandler] = useState<((clubSlug: string) => void) | null>(null);

    // Handler for club selection from search
    const handleClubSelect = (clubIndex: number) => {
        // Convert club index to club slug and trigger map selection
        if (externalClubSelectHandler) {
            const clubs = pullClubsListContent();
            const selectedClub = clubs[clubIndex];
            if (selectedClub) {
                externalClubSelectHandler(selectedClub.slug);
            }
        }
    };

    const handleExternalClubSelectSetup = (handler: (clubSlug: string) => void) => {
        setExternalClubSelectHandler(() => handler);
    };

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
                        onExternalClubSelect={handleExternalClubSelectSetup}
                    />
                    <MapListFilterSwitcher
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                        onClubSelect={handleClubSelect}
                    />
                </div>
                <div className="lg:hidden">
                    <OpenStreetMap
                        showHRInfo={showHRFilter}
                        isDesktopMap={false}
                        isDarkMode={isDarkMode}
                        setIsDarkMode={setIsDarkMode}
                        onExternalClubSelect={handleExternalClubSelectSetup}
                    />
                    <MapListFilterSwitcher
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                        onClubSelect={handleClubSelect}
                    />
                </div>
            </div>
        </div>
    );
}
