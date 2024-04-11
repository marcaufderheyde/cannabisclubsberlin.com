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
    const [showMap, setShowMap] = useState(false);

    return (
        <div className='flex flex-col md:flex-col w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 md:pl-[YourNavbarWidth]'>
            <ClubsContent />
            <br/>
            <button onClick={() => setShowMap(!showMap)} className='mb-4 p-2 bg-green-500 text-white rounded'>
                {showMap ? 'Show Clubs List' : 'Show Map'}
            </button>
            {showMap ? <p>{t("map_disclaimer")}</p> : null}
            <br/>
            {showMap ? <OpenStreetMap /> : <ClubsList />}
        </div>
    );
}
