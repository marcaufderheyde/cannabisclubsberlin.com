'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import ClubsList from './club-list';
import Navbar from '@/app/ui/Navigation/navbar';
import MapListViewSwitcher from '@/app/Components/MapListViewSwitcher';

export default function ClubsContent() {
    const OpenStreetMap = dynamic(
        () => import('@/app/Components/OpenStreetMap'),
        {
            ssr: false,
        }
    );

    const [showMap, setShowMap] = useState(true);

    return (
        <div>
            <Navbar isOnMap={true} />
            {showMap ? (
                <div>
                    <div className="hidden lg:flex">
                        <OpenStreetMap isDesktopMap={true} />
                    </div>
                    <div className="lg:hidden flex">
                        <OpenStreetMap isDesktopMap={false} />
                    </div>
                    <MapListViewSwitcher
                        showMap={showMap}
                        setShowMap={setShowMap}
                    />
                </div>
            ) : (
                <div className="absolute top-[var(--navbar-height)] left-0">
                    <MapListViewSwitcher
                        showMap={showMap}
                        setShowMap={setShowMap}
                    />
                    <ClubsList />
                </div>
            )}
        </div>
    );
}
