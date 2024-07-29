'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import ClubsList from './club-list';
import Navbar from '@/app/ui/Navigation/navbar';
import MapListViewSwitcher from '@/app/Components/MapListViewSwitcher';
import { Club } from '@/app/helpers/clubsListContent';
import MobileClubList from '@/app/Components/MobileClubList';

export default function ClubsContent() {
    const OpenStreetMap = dynamic(
        () => import('@/app/Components/OpenStreetMap'),
        {
            ssr: false,
        }
    );
    const [showMap, setShowMap] = useState(true);
    const [selectedClubFromList, setSelectedClubFromList] = useState<Club>();

    // useEffect(() => {
    //     const handleResize = () => {
    //         let vh = window.innerHeight * 0.01;
    //         document.documentElement.style.setProperty(
    //             '--doc-height',
    //             `${vh}px`
    //         );
    //     };

    //     // Call the function once to set the initial value
    //     handleResize();

    //     // Add the event listener
    //     window.addEventListener('resize', handleResize);

    //     // Remove the event listener on cleanup
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

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
                        <MapListViewSwitcher
                            showMap={showMap}
                            setShowMap={setShowMap}
                        />
                    </div>
                </div>
            ) : (
                <div className="md:hidden absolute top-[var(--navbar-height-mobile)] md:top-[var(--navbar-height)] left-0">
                    <MapListViewSwitcher
                        showMap={showMap}
                        setShowMap={setShowMap}
                    />
                    <MobileClubList
                        clubClickedFromList={() => {
                            setSelectedClubFromList;
                        }}
                    />
                </div>
            )}
        </div>
    );
}
