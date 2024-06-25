'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
    showMap: boolean;
    setShowMap: Dispatch<SetStateAction<boolean>>;
};

function MapListViewSwitcher({ showMap, setShowMap }: Props) {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();

    const mapButtonBackground = showMap
        ? 'bg-white text-black'
        : 'bg-gray-200 text-neutral-400';
    const listButtonBackground = showMap
        ? 'bg-gray-200 text-neutral-400'
        : 'bg-white text-black';
    const mapListViewSwitcherPosition = showMap
        ? 'absolute top-[var(--navbar-height)] left-0'
        : 'right-0';
    return (
        <div
            className={
                'inline-flex ' +
                mapListViewSwitcherPosition +
                ' z-[998] lg:m-8 lg:ml-20 m-4 rounded-3xl shadow-md'
            }
        >
            <div className={'z-[999] rounded-l-3xl ' + mapButtonBackground}>
                <button
                    onClick={() => setShowMap(true)}
                    className={
                        'flex z-[999] cursor-pointer items-center p-2 lg:p-4'
                    }
                >
                    {t('clubs_menu_show_map')}
                </button>
            </div>
            <div className={'z-[999] rounded-r-3xl ' + listButtonBackground}>
                <button
                    onClick={() => setShowMap(false)}
                    className={
                        'flex z-[999] cursor-pointer items-center p-2 lg:p-4'
                    }
                >
                    {t('clubs_menu_show_list')}
                </button>
            </div>
        </div>
    );
}

export default MapListViewSwitcher;
