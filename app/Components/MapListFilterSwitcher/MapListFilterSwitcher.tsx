'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
    showHRFilter: boolean;
    setShowHRFilter: Dispatch<SetStateAction<boolean>>;
};

function MapListFilterSwitcher({
    setShowHRFilter: setShowHRInfo,
    showHRFilter,
}: Props) {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();

    const displayHRClubsButtonBackground = showHRFilter
        ? 'bg-white text-black font-semibold'
        : 'bg-gray-100 text-neutral-400';
    const displayAllClubsButtonBackground = showHRFilter
        ? 'bg-gray-100 text-neutral-400'
        : 'bg-white text-black font-semibold';
    const mapListFilterSwitcherPosition =
        'absolute top-[var(--navbar-height)] md:top-[var(--navbar-height)] left-0';

    return (
        <div className="w-[100vw] flex align-middle justify-left">
            <div
                className={
                    'inline-flex ' +
                    mapListFilterSwitcherPosition +
                    ' z-[998] lg:m-8 lg:ml-20 m-4 rounded-xl shadow-xl bg-gray-100'
                }
            >
                <button
                    aria-label="show hr clubs button"
                    onClick={() => setShowHRInfo(true)}
                    className={
                        'z-[999] rounded-xl cursor-pointer items-center text-lg  my-1 mr-1 px-4 py-2 lg:px-5 lg:py-1.5 ' +
                        displayHRClubsButtonBackground
                    }
                >
                    {t('clubs_menu_show_hr_clubs')}
                </button>
                <button
                    aria-label="show all clubs button"
                    onClick={() => setShowHRInfo(false)}
                    className={
                        'z-[999] rounded-xl cursor-pointer items-center text-lg  my-1 mr-1 px-4 py-2 lg:px-5 lg:py-1.5 ' +
                        displayAllClubsButtonBackground
                    }
                >
                    {t('clubs_menu_show_all_clubs')}
                </button>
            </div>
        </div>
    );
}

export default MapListFilterSwitcher;
