'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
    showMap: boolean;
    setShowMap: Dispatch<SetStateAction<boolean>>;
    setShowHRFilter: Dispatch<SetStateAction<boolean>>;
};

export default function MapListViewSwitcher({ showMap, setShowMap }: Props) {
    const t = useTranslations('ClubsPage');

    const mapButtonBackground = showMap
        ? 'bg-white text-black font-semibold'
        : 'bg-gray-100 text-neutral-400';
    const listButtonBackground = showMap
        ? 'bg-gray-100 text-neutral-400'
        : 'bg-white text-black font-semibold';
    const mapListViewSwitcherPosition =
        'absolute top-[var(--navbar-height-mobile)] md:top-[var(--navbar-height)] right-0';
    return (
        <div className="w-[100vw] flex align-middle justify-left">
            <div
                className={
                    'inline-flex ' +
                    mapListViewSwitcherPosition +
                    ' z-[998] lg:m-8 lg:ml-20 m-4 rounded-xl shadow-xl bg-gray-100'
                }
            >
                <button
                    aria-label="show map button"
                    onClick={() => setShowMap(true)}
                    className={
                        'z-[999] cursor-pointer items-center rounded-xl text-lg my-1 ml-1 px-4 py-2 lg:px-5 lg:py-1.5 ' +
                        mapButtonBackground
                    }
                >
                    {t('clubs_menu_show_map')}
                </button>
                <button
                    aria-label="show club list button"
                    onClick={() => setShowMap(false)}
                    className={
                        'z-[999] rounded-xl cursor-pointer items-center text-lg  my-1 mr-1 px-4 py-2 lg:px-5 lg:py-1.5 ' +
                        listButtonBackground
                    }
                >
                    {t('clubs_menu_show_list')}
                </button>
            </div>
        </div>
    );
}
