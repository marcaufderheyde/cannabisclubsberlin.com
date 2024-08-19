'use client';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L, { Map } from 'leaflet';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { useTranslations } from 'next-intl';
import styles from '@/app/styles/ClubCard.module.css';
import CustomPopup from './CustomPopup'; // Import the custom popup component
import CustomMarker from './CustomMarker';
import jumpToMarker from '../helpers/jumpToMarker';
import mod from '../helpers/mod';
import SwipeableClubCard from './SwipeableClubCard';
import SwipeableDeck from './SwipeableDeck';
import useDebounceFunction from '../helpers/useDebounceFunction';
import { AnimatePresence, motion } from 'framer-motion';
import DesktopClubList from './DesktopClubList';
import withMotion from '../helpers/WithMotion';
import MapHamburgerButton from '@/app/Components/MapHamburgerButton';

export type Club = {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string[];
    harmReduction?: string;
    hasHRInformation: boolean;
};

const customIcon: L.Icon<L.IconOptions> = L.icon({
    iconUrl: '/leaf-weed.png',
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -37], // point from which the popup should open relative to the iconAnchor
});

const selectedIcon: L.Icon<L.IconOptions> = L.icon({
    iconUrl: '/leaf-weed-selected.png',
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -37], // point from which the popup should open relative to the iconAnchor
});

type OpenStreetMapProps = {
    isDesktopMap: boolean;
    showHRInfo: boolean;
};

const MotionSwipableDeck = withMotion(SwipeableDeck);
const MotionDesktopClubList = withMotion(DesktopClubList);

export default function OpenStreetMap(props: OpenStreetMapProps) {
    const mainMapRef = useRef(null);
    const t = useTranslations('ClubsPage');
    const [map, setMap] = useState<Map | null>(null);
    const [clubIndex, setClubIndex] = useState<number | null>(null);
    const [clubIndexExists, setClubIndexExists] = useState(false);
    const [clubListExpanded, setClubListExpanded] = useState(false);
    const [showClubList, setShowClubList] = useState(false);

    const [centerCoords, setCenterCoords] = useState<{
        lat: number;
        lng: number;
    }>({
        lat: 52.51664,
        lng: 13.40828,
    });
    const zoomRef = useRef(12);

    const clubsRef = useRef<Club[]>(pullClubsListContent());
    const clubs = clubsRef.current;
    const selectedClub = clubIndexExists && clubs[clubIndex!];

    // const MotionSwipableDeck = withMotion(SwipeableDeck);

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        let clubOfferings = t(
            `offerings_tags.slug_to_tags_indices.${club.slug}`
        );
        const pattern = /, |and /;
        club.offerings = clubOfferings.split(pattern);
        club.harmReduction = t(`${club.slug}.harm_reduction`);
        if (
            club.harmReduction ===
                'This club has currently not listed any specific harm reduction services.' ||
            club.harmReduction ===
                'Dieser Club hat derzeit keine speziellen Dienste zur Schadensminderung aufgelistet.'
        ) {
            club.hasHRInformation = false;
        } else {
            club.hasHRInformation = true;
        }
    });

    const filteredClubs = props.showHRInfo
        ? clubs.filter((club) => club.hasHRInformation)
        : clubs;

    const zoom = 13;

    const setNextClub = () => {
        if (clubIndexExists)
            setClubIndex(mod(clubIndex! + 1, filteredClubs.length));
    };
    const setPreviousClub = () => {
        if (clubIndexExists)
            setClubIndex(mod(clubIndex! - 1, filteredClubs.length));
    };

    const debouncedMapFly = useDebounceFunction(
        (clubIndex) =>
            jumpToMarker(
                map,
                mainMapRef,
                clubIndex,
                clubs,
                setCenterCoords,
                props.isDesktopMap,
                zoomRef.current
            ),
        100
    );

    useEffect(() => {
        setClubIndexExists(clubIndex != null);

        if (map && clubIndexExists) {
            debouncedMapFly(clubIndex);
        }

        // setTimeout(() => , 3000);
        setClubIndexExists(clubIndex != null);

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowLeft':
                    setPreviousClub();
                    break;
                case 'ArrowRight':
                    setNextClub();
                    break;
                default:
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [clubIndex]);

    useEffect(() => {
        setTimeout(() => {
            setShowClubList(clubListExpanded);
        }, 100);
    }, [clubListExpanded]);

    useEffect(() => {
        const handleZoomEnd = () => {
            if (map) zoomRef.current = map.getZoom();
        };

        map?.addEventListener('zoomend', handleZoomEnd);

        return () => {
            map?.removeEventListener('zoomend', handleZoomEnd);
        };
    }, [map]);

    return (
        <div>
            {props.isDesktopMap && (
                <div className='absolute flex flex-row flex-nowrap justify-end items-stretch right-0 top-[var(--navbar-height)] dynamic-height z-[2005]'>
                    {selectedClub && clubIndexExists && (
                        <CustomPopup
                            style={{
                                opacity: 'var(--deck-opacity)',
                            }}
                            clubIndex={clubIndex!}
                            club={selectedClub!}
                            clubs={filteredClubs}
                            onClose={() => setClubIndex(null)}
                            switchNextClub={() => {
                                setNextClub();
                            }}
                            switchPreviousClub={() => {
                                setPreviousClub();
                            }}
                            clubListExpanded={clubListExpanded}
                        />
                    )}
                    <DesktopClubList
                        clubClickedFromList={(selectedIndex: number) => {
                            setClubIndex(selectedIndex);
                        }}
                        setClubListExpanded={(isExpanded: boolean) =>
                            setClubListExpanded(isExpanded)
                        }
                        currentClubIndex={clubIndex}
                    />
                </div>
            )}
            <AnimatePresence
                mode='sync'
                onExitComplete={() => console.log('Exit animation complete')}
            >
                {selectedClub && clubIndexExists && (
                    <motion.div
                        key='swipeable-deck'
                        initial={{ '--deck-opacity': 0 }}
                        animate={{ '--deck-opacity': 1 }}
                        exit={{ '--deck-opacity': 0 }}
                        transition={{
                            duration: 0.2,
                            ease: 'easeOut',
                        }}
                        onAnimationStart={() =>
                            console.log('Animation started')
                        }
                        onAnimationComplete={() =>
                            console.log('Animation completed')
                        }
                    >
                        <SwipeableDeck
                            style={{ opacity: 'var(--deck-opacity)' }}
                            items={clubs}
                            Card={SwipeableClubCard}
                            currentIndex={clubIndex}
                            onDownSwipeClose={() => setClubIndex(null)}
                            // change "true" to setClubIndex(null) whenever animations are figured out
                            // onUpSwipeClose={() => true}
                            onRightSwipe={() => setNextClub()}
                            onLeftSwipe={() => setPreviousClub()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`${styles.mapContainer} h-screen`} ref={mainMapRef}>
                <MapContainer
                    key={0}
                    center={centerCoords}
                    zoom={zoom}
                    zoomControl={false}
                    style={{ height: '100%', width: '100%' }}
                    ref={setMap}
                >
                    <ZoomControl position='bottomright' />
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {filteredClubs.map((club, index) => (
                        <CustomMarker
                            key={index}
                            index={index}
                            location={club.geoLocation}
                            customIcon={
                                selectedClub && club.slug == selectedClub.slug
                                    ? selectedIcon
                                    : customIcon
                            }
                            clickedOnMarker={() => {
                                setClubIndex(index);
                            }}
                        />
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
