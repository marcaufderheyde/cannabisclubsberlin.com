'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/app/components/Navbar/Navbar';
import MapListFilterSwitcher from '@/app/components/MapListFilterSwitcher/MapListFilterSwitcher';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { Club } from '@/app/components/OpenStreetMap/OpenStreetMap';

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
    const t = useTranslations('ClubsPage');

    // Compute filtered clubs (same logic as OpenStreetMap)
    const allClubs: Club[] = pullClubsListContent().map((club) => ({
        ...club,
        offerings: typeof club.offerings === 'string'
            ? club.offerings.split(', ')
            : [], // Ensure offerings is an array
    }));
    
    // Apply harm reduction logic to determine hasHRInformation
    allClubs.forEach((club) => {
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
        if (
            club.harm_reduction ===
                'This club has currently not listed any specific harm reduction services.' ||
            club.harm_reduction ===
                'Dieser Club hat derzeit keine speziellen Dienste zur Schadensminderung aufgelistet.'
        ) {
            club.hasHRInformation = false;
        } else {
            club.hasHRInformation = true;
        }
    });

    const filteredClubs = showHRFilter 
        ? allClubs.filter((club) => club.hasHRInformation)
        : allClubs;

    // Handler for club selection from search
    const handleClubSelect = (clubIndex: number) => {
        // Convert club index to club slug and trigger map selection
        if (externalClubSelectHandler) {
            const selectedClub = filteredClubs[clubIndex]; // Use filtered clubs
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
                        clubs={filteredClubs}
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
                        clubs={filteredClubs}
                    />
                </div>
            </div>
        </div>
    );
}
