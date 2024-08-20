'use client';
import dynamic from 'next/dynamic';
import { SetStateAction, useState } from 'react';
import ClubsList from './club-list';
import Navbar from '@/app/components/Navbar/Navbar';
import MapListViewSwitcher from '@/app/components/MapListViewSwitcher/MapListViewSwitcher';
import { Club } from '@/app/helpers/clubsListContent';
import MobileClubList from '@/app/components/MobileClubList/MobileClubList';
import MapListFilterSwitcher from '@/app/components/MapListFilterSwitcher/MapListFilterSwitcher';
const OpenStreetMap = dynamic(
    () => import('@/app/components/OpenStreetMap/OpenStreetMap'),
    {
        ssr: false,
    }
);

export default function ClubsContent() {
    const [showMap, setShowMap] = useState(true);
    const [selectedClubFromList, setSelectedClubFromList] = useState<Club>();
    const [showHRFilter, setShowHRFilter] = useState(false);

    return (
        <div>
            <Navbar isOnMap={true} />
            {showMap ? (
                <div>
                    <div className="hidden lg:flex">
                        <OpenStreetMap
                            showHRInfo={showHRFilter}
                            isDesktopMap={true}
                        />
                        <MapListFilterSwitcher
                            showMap={showMap}
                            showHRFilter={showHRFilter}
                            setShowHRFilter={setShowHRFilter}
                        />{' '}
                    </div>
                    <div className="lg:hidden flex">
                        <OpenStreetMap
                            showHRInfo={showHRFilter}
                            isDesktopMap={false}
                        />
                        <MapListFilterSwitcher
                            showMap={showMap}
                            showHRFilter={showHRFilter}
                            setShowHRFilter={setShowHRFilter}
                        />{' '}
                    </div>
                </div>
            ) : (
                <div className="md:hidden absolute top-[var(--navbar-height-mobile)] md:top-[var(--navbar-height)] left-0">
                    <MapListFilterSwitcher
                        showMap={showMap}
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                    />{' '}
                    <MapListViewSwitcher
                        showMap={showMap}
                        setShowMap={setShowMap}
                        setShowHRFilter={setShowHRFilter}
                    />
                    <MobileClubList
                        showHRInfo={showHRFilter}
                        clubClickedFromList={() => {
                            setSelectedClubFromList;
                        }}
                    />
                </div>
            )}
        </div>
    );
}
