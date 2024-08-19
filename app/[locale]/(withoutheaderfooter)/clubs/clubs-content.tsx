'use client';
import dynamic from 'next/dynamic';
import { SetStateAction, useState } from 'react';
import ClubsList from './club-list';
import Navbar from '@/app/ui/Navigation/navbar';
import MapListViewSwitcher from '@/app/Components/MapListViewSwitcher';
import { Club } from '@/app/helpers/clubsListContent';
import MobileClubList from '@/app/Components/MobileClubList';
import MapListFilterSwitcher from '@/app/Components/MapListFilterSwitcher';
const OpenStreetMap = dynamic(() => import('@/app/Components/OpenStreetMap'), {
    ssr: false,
});

export default function ClubsContent() {
    const [showHRFilter, setShowHRFilter] = useState(false);

    return (
        <div>
            <Navbar isOnMap={true} />
            <div>
                <div className='hidden lg:flex'>
                    <OpenStreetMap
                        showHRInfo={showHRFilter}
                        isDesktopMap={true}
                    />
                    <MapListFilterSwitcher
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                    />{' '}
                </div>
                <div className='lg:hidden flex'>
                    <OpenStreetMap
                        showHRInfo={showHRFilter}
                        isDesktopMap={false}
                    />
                    <MapListFilterSwitcher
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                    />{' '}
                </div>
            </div>
        </div>
    );
}
