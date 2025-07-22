'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBarFuse from '@/app/components/OpenStreetMap/SearchBarFuse';
import FilterSVG from '@/app/components/Svg/filter-svg';
import Close from '@/app/components/Close/Close';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { Club } from '@/app/components/OpenStreetMap/OpenStreetMap';

type Props = {
    showHRFilter: boolean;
    setShowHRFilter: Dispatch<SetStateAction<boolean>>;
    onClubSelect?: (clubIndex: number) => void;
    clubs?: Club[];
};

function MapListFilterSwitcher({
    setShowHRFilter: setShowHRInfo,
    showHRFilter,
    onClubSelect,
    clubs: providedClubs,
}: Props) {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    // Use provided clubs or fall back to original logic
    const clubs =
        providedClubs ||
        pullClubsListContent().map((club) => ({
            ...club,
            description: t(`${club.slug}.description`),
            offerings:
                typeof club.offerings === 'string'
                    ? club.offerings.split(', ')
                    : [],
        }));

    const handleClubSelect = (clubIndex: number) => {
        if (onClubSelect) {
            onClubSelect(clubIndex);
        } else {
            console.log('Club selected:', clubs[clubIndex]);
        }
    };

    const handleFilterToggle = () => {
        setIsFilterExpanded(!isFilterExpanded);
    };

    const handleFilterSelect = (isHR: boolean) => {
        setShowHRInfo(isHR);
        // Don't collapse after selection - only collapse on X button click
    };

    const displayHRClubsButtonBackground = showHRFilter
        ? 'bg-white text-black font-semibold'
        : 'bg-gray-100 text-neutral-400';
    const displayAllClubsButtonBackground = showHRFilter
        ? 'bg-gray-100 text-neutral-400'
        : 'bg-white text-black font-semibold';
    const mapListFilterSwitcherPosition =
        'absolute top-[var(--navbar-height-mobile)] lg:top-[var(--navbar-height)] left-0';

    return (
        <>
            {/* Desktop version - unchanged */}
            <div className="hidden lg:block w-[100vw] flex align-middle justify-left">
                <div
                    className={
                        'inline-flex ' +
                        mapListFilterSwitcherPosition +
                        ' z-[950] lg:m-8 lg:ml-20 m-4 rounded-xl shadow-xl bg-gray-100'
                    }
                >
                    <button
                        aria-label="show hr clubs button"
                        onClick={() => setShowHRInfo(true)}
                        className={
                            'z-[951] rounded-xl cursor-pointer items-center text-sm sm:text-md md:text-lg my-1 mr-1 px-4 py-2 lg:px-5 lg:py-1.5 ' +
                            displayHRClubsButtonBackground
                        }
                    >
                        {t('clubs_menu_show_hr_clubs')}
                    </button>
                    <button
                        aria-label="show all clubs button"
                        onClick={() => setShowHRInfo(false)}
                        className={
                            'z-[951] rounded-xl cursor-pointer items-center text-sm sm:text-md md:text-lg my-1 mr-1 px-4 py-2 lg:px-5 lg:py-1.5 ' +
                            displayAllClubsButtonBackground
                        }
                    >
                        {t('clubs_menu_show_all_clubs')}
                    </button>
                </div>
            </div>

            {/* Mobile version - unified component with expandable filter */}
            <div className="lg:hidden block">
                <div className="absolute top-[var(--navbar-height-mobile)] left-4 right-4 z-[950] my-4">
                    <div className="flex rounded-xl shadow-xl bg-white border border-gray-200">
                        <AnimatePresence mode="wait">
                            {!isFilterExpanded ? (
                                /* Default state - Search (2/3) + Filter Icon (1/3) */
                                <motion.div
                                    key="default-layout"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex w-full"
                                >
                                    {/* Search Bar - 2/3 width */}
                                    <div className="flex-[2] flex items-center rounded-l-xl bg-white">
                                        <div className="w-full p-2">
                                            <SearchBarFuse
                                                clubs={clubs}
                                                onClubSelect={handleClubSelect}
                                                placeholder="Search..."
                                                isMobile={true}
                                            />
                                        </div>
                                    </div>

                                    {/* Filter Icon - 1/3 width */}
                                    <div className="flex-1 border-l border-gray-200 rounded-r-xl bg-white">
                                        <button
                                            aria-label="toggle filter options"
                                            onClick={handleFilterToggle}
                                            className="w-full h-full flex items-center justify-center px-4 py-3 hover:bg-gray-50 transition-colors duration-200 rounded-r-xl"
                                        >
                                            <FilterSVG
                                                color="#868686"
                                                className="w-6 h-6"
                                            />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                /* Expanded state - Search (1/3) + HR (1/3) + All Clubs (1/3) */
                                <motion.div
                                    key="expanded-layout"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    className="flex w-full relative"
                                >
                                    {/* Search Bar - 1/3 width (shrunk) */}
                                    <div className="flex-1 flex items-center rounded-l-xl bg-white">
                                        <div className="w-full p-2">
                                            <SearchBarFuse
                                                clubs={clubs}
                                                onClubSelect={handleClubSelect}
                                                placeholder="Search..."
                                                isMobile={true}
                                            />
                                        </div>
                                    </div>

                                    {/* HR Button - 1/3 width */}
                                    <div className="flex-1 border-l border-gray-200 bg-white">
                                        <button
                                            aria-label="show hr clubs button"
                                            onClick={() =>
                                                handleFilterSelect(true)
                                            }
                                            className={
                                                'w-full h-full flex items-center justify-center text-sm px-2 py-3 transition-colors duration-200 ' +
                                                displayHRClubsButtonBackground
                                            }
                                        >
                                            Harm Reduction
                                        </button>
                                    </div>

                                    {/* All Clubs Button - 1/3 width */}
                                    <div className="flex-1 border-l border-gray-200 rounded-r-xl bg-white">
                                        <button
                                            aria-label="show all clubs button"
                                            onClick={() =>
                                                handleFilterSelect(false)
                                            }
                                            className={
                                                'w-full h-full flex items-center justify-center text-sm px-2 py-3 transition-colors duration-200 rounded-r-xl ' +
                                                displayAllClubsButtonBackground
                                            }
                                        >
                                            All Clubs
                                        </button>
                                    </div>

                                    {/* Close Button - Small overlay in top-right */}
                                    <button
                                        aria-label="close filter options"
                                        onClick={handleFilterToggle}
                                        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 z-10"
                                    >
                                        <Close color="#868686" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MapListFilterSwitcher;
