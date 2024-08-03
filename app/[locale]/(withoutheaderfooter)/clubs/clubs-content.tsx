'use client';
import dynamic from 'next/dynamic';
import { SetStateAction, useState } from 'react';
import ClubsList from './club-list';
import Navbar from '@/app/ui/Navigation/navbar';
import MapListViewSwitcher from '@/app/Components/MapListViewSwitcher';
import { Club } from '@/app/helpers/clubsListContent';
import MobileClubList from '@/app/Components/MobileClubList';
import MapLIstFilterSwitcher from '@/app/Components/MapListFilterSwitcher';
const OpenStreetMap = dynamic(() => import('@/app/Components/OpenStreetMap'), {
    ssr: false,
});

export default function ClubsContent() {
    const [showMap, setShowMap] = useState(true);
    const [selectedClubFromList, setSelectedClubFromList] = useState<Club>();
    const [showHRFilter, setShowHRFilter] = useState(false);

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
                    <div className='hidden lg:flex'>
                        <OpenStreetMap
                            showHRInfo={showHRFilter}
                            isDesktopMap={true}
                        />
                        <MapLIstFilterSwitcher
                            showMap={showMap}
                            showHRFilter={showHRFilter}
                            setShowHRFilter={setShowHRFilter}
                        />{' '}
                    </div>
                    <div className='lg:hidden flex'>
                        <OpenStreetMap
                            showHRInfo={showHRFilter}
                            isDesktopMap={false}
                        />
                        <MapLIstFilterSwitcher
                            showMap={showMap}
                            showHRFilter={showHRFilter}
                            setShowHRFilter={setShowHRFilter}
                        />{' '}
                    </div>
                </div>
            ) : (
                <div className='md:hidden absolute top-[var(--navbar-height-mobile)] md:top-[var(--navbar-height)] left-0'>
                    <MapLIstFilterSwitcher
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
