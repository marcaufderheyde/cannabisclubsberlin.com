'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { SetStateAction, useState } from 'react';
import ClubsList from './club-list';
import Navbar from '@/app/ui/Navigation/navbar';
import MapListViewSwitcher from '@/app/Components/MapListViewSwitcher';
import MapLIstFilterSwitcher from '@/app/Components/MapListFilterSwitcher';

export default function ClubsContent() {
    const OpenStreetMap = dynamic(
        () => import('@/app/Components/OpenStreetMap'),
        {
            ssr: false,
        }
    );
    const [showMap, setShowMap] = useState(true);
    const [showHRFilter, setShowHRFilter] = useState(false);
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();

    const mapButtonBackground = showMap
        ? 'bg-white text-black'
        : 'bg-gray-200 text-neutral-400';
    const listButtonBackground = showMap
        ? 'bg-gray-200 text-neutral-400'
        : 'bg-white text-black';

    return (
        <div>
            <Navbar isOnMap={true} />
            {showMap ? (
                <div>
                    <div className="hidden lg:flex">
                        <OpenStreetMap
                            isDesktopMap={true}
                            showHRInfo={showHRFilter}
                        />
                    </div>
                    <div className="lg:hidden flex">
                        <OpenStreetMap
                            isDesktopMap={false}
                            showHRInfo={showHRFilter}
                        />
                    </div>
                    <MapLIstFilterSwitcher
                        showMap={showMap}
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                    />{' '}
                    <MapListViewSwitcher
                        showMap={showMap}
                        setShowMap={setShowMap}
                    />
                </div>
            ) : (
                <div className="absolute top-[var(--navbar-height)] left-0">
                    <MapLIstFilterSwitcher
                        showMap={showMap}
                        showHRFilter={showHRFilter}
                        setShowHRFilter={setShowHRFilter}
                    />
                    <MapListViewSwitcher
                        showMap={showMap}
                        setShowMap={setShowMap}
                    />
                    <ClubsList showHRInfo={showHRFilter} />
                </div>
            )}
        </div>
    );
}
