"use client"
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import ClubsList from './club-list';


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
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                {t("headline")}
            </h1>
            <p>
            {t("headline_description")}
            </p>
            <p>
            {t("headline_subdescription")}
            </p>

            <br />
            <button
                onClick={() => setShowMap(!showMap)}
                className={
                    'py-2 px-4 md:py-3 md:px-7 flex flex-row justify-center rounded-3xl cursor-pointer items-center gap-3'
                }
                style={{ color: '#FFFFFF', backgroundColor: '#B6CF54' }}
            >
                {showMap ? t('clubs_menu_show_list') : t('clubs_menu_show_map')}
            </button>
            <br />
            {showMap ? <p>{t('map_disclaimer')}</p> : null}
            <br />
            {showMap ? <OpenStreetMap /> : <ClubsList />}

        </div>
    );
}