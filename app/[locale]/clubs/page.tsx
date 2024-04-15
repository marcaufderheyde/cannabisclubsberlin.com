'use client'
import React, { useState } from 'react';
import ClubsContent from './clubs-content';
import ClubsList from './club-list';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl';

export default function Clubs({ params: { locale } }: { params: { locale: string } }) {
    //unstable_setRequestLocale(locale);
    const t = useTranslations('ClubsPage');
    const OpenStreetMap = dynamic(() => import('@/app/Components/OpenStreetMap'), {
        ssr: false,
      })
    const [showMap, setShowMap] = useState(true);

    return (
        <div className='flex flex-col md:flex-col w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 md:pl-[YourNavbarWidth]'>
            <ClubsContent />
            <br/>
            <button onClick={() => setShowMap(!showMap)} className={
                    'py-2 px-4 md:py-3 md:px-7 flex flex-row justify-center rounded-3xl cursor-pointer items-center gap-3'
                }
                style={{ color: '#FFFFFF', backgroundColor: '#B6CF54' }}
                >
                {showMap ? t("clubs_menu_show_list") : t("clubs_menu_show_map")}
            </button>
            <br/>
            {showMap ? <p>{t("map_disclaimer")}</p> : null}
            <br/>
            {showMap ? <OpenStreetMap /> : <ClubsList />}
        </div>
    );
}
