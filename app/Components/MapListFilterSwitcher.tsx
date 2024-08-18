'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
    showMap: boolean;
    showHRFilter: boolean;
    setShowHRFilter: Dispatch<SetStateAction<boolean>>;
};

function MapListFilterSwitcher({
    setShowHRFilter: setShowHRInfo,
    showMap,
    showHRFilter,
}: Props) {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();

    const mapButtonBackground = showHRFilter
        ? 'bg-white text-black'
        : 'bg-gray-200 text-neutral-400';
    const listButtonBackground = showHRFilter
        ? 'bg-gray-200 text-neutral-400'
        : 'bg-white text-black';
    const mapListViewSwitcherPosition = showMap
        ? 'absolute top-[var(--navbar-height)] left-0'
        : 'relative top-[var(--navbar-height)]';

    return (
        <div className='w-[100vw] flex align-middle justify-left'>
            <div
                className={
                    'inline-flex ' +
                    mapListViewSwitcherPosition +
                    ' z-[998] lg:m-8 lg:ml-20 m-4 rounded-3xl shadow-md'
                }
            >
                <div className={'z-[999] rounded-l-3xl ' + mapButtonBackground}>
                    <button
                        onClick={() => setShowHRInfo(true)}
                        className={
                            'flex z-[999] cursor-pointer items-center p-2 lg:p-4'
                        }
                    >
                        Harm Reduction Clubs
                    </button>
                </div>
                <div
                    className={'z-[999] rounded-r-3xl ' + listButtonBackground}
                >
                    <button
                        onClick={() => setShowHRInfo(false)}
                        className={
                            'flex z-[999] cursor-pointer items-center p-2 lg:p-4'
                        }
                    >
                        All Clubs
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MapListFilterSwitcher;
