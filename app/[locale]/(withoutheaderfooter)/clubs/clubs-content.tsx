'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import ClubsList from './club-list';
import Navbar from '@/app/ui/Navigation/navbar';
import MapListViewSwitcher from '@/app/Components/MapListViewSwitcher';

export default function ClubsContent() {
    //unstable_setRequestLocale(locale);
    const OpenStreetMap = dynamic(
        () => import('@/app/Components/OpenStreetMap'),
        {
            ssr: false,
        }
    );
    const [showMap, setShowMap] = useState(true);
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();

    const mapButtonBackground = showMap
        ? 'bg-white text-black'
        : 'bg-gray-200 text-neutral-400';
    const listButtonBackground = showMap
        ? 'bg-gray-200 text-neutral-400'
        : 'bg-white text-black';

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
                    </div>
                    <MapListViewSwitcher
                        showMap={showMap}
                        setShowMap={setShowMap}
                    />
                </div>
            ) : (
                <div className="absolute top-[var(--navbar-height-mobile)]   md:top-[var(--navbar-height)] left-0">
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
