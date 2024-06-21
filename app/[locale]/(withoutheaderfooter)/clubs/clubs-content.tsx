'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import ClubsList from './club-list';
import DropdownContent from '@/app/Components/DropdownContent';
import styles from '@/app/styles/ClubCard.module.css';
import Navbar from '@/app/ui/Navigation/navbar';

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

    return (
        <div>
            <Navbar isOnMap={true} />
            {showMap ? <OpenStreetMap /> : <ClubsList />}
            <div className="inline-flex absolute top-[var(--navbar-height)] right-0 z-[998] lg:m-8 m-4 rounded-3xl shadow-md">
                <div
                    className={
                        'z-[999] cursor-pointer items-center p-4 rounded-l-3xl ' +
                        mapButtonBackground
                    }
                >
                    <button
                        onClick={() => setShowMap(true)}
                        className={'flex z-[999]'}
                    >
                        {t('clubs_menu_show_map')}
                    </button>
                </div>
                <div
                    className={
                        'z-[999] cursor-pointer items-center p-4 rounded-r-3xl ' +
                        listButtonBackground
                    }
                >
                    <button
                        onClick={() => setShowMap(false)}
                        className={'flex z-[999]'}
                    >
                        {t('clubs_menu_show_list')}
                    </button>
                </div>
            </div>
            {/* <br /> */}
            {/* {showMap ? (
                <p style={{ padding: '20px' }}>{t('map_disclaimer')}</p>
            ) : null}
            <p style={{ padding: '20px' }}>
                {t('headline_description')}
                <br />
                {t('headline_subdescription')}
                <br />
                <br />
                <button
                    onClick={() => setShowMap(!showMap)}
                    className={
                        'py-2 px-4 md:py-3 md:px-7 flex flex-row justify-center rounded-3xl cursor-pointer items-center gap-3'
                    }
                    style={{
                        color: '#FFFFFF',
                        backgroundColor: '#B6CF54',
                        padding: '20px',
                    }}
                >
                    {showMap
                        ? t('clubs_menu_show_list')
                        : t('clubs_menu_show_map')}
                </button>
            </p> */}
        </div>
    );
}
