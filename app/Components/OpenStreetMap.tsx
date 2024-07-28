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
import ClubsList from '@/app/[locale]/(withoutheaderfooter)/clubs/club-list';

export type Club = {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string[];
    harm_reduction?: string;
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
};

export default function OpenStreetMap(props: OpenStreetMapProps) {
    const mainMapRef = useRef(null);
    const t = useTranslations('ClubsPage');
    const [map, setMap] = useState<Map | null>(null);
    const [clubIndex, setClubIndex] = useState<number | null>(null);
    const [clubIndexExists, setClubIndexExists] = useState(false);
    const [centerCoords, setCenterCoords] = useState<{
        lat: number;
        lng: number;
    }>({
        lat: 52.51664,
        lng: 13.40828,
    });
    const zoomRef = useRef(12);

    // const clubIndexExists = clubIndex != null;

    const clubsRef = useRef<Club[]>(pullClubsListContent());
    const clubs = clubsRef.current;
    const selectedClub = clubIndexExists && clubs[clubIndex];

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        let clubOfferings = t(
            `offerings_tags.slug_to_tags_indices.${club.slug}`
        );
        const pattern = /, |and /;
        club.offerings = clubOfferings.split(pattern);
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
    });

    const zoom = 13;

    const setNextClub = () => {
        if (clubIndexExists) setClubIndex(mod(clubIndex + 1, clubs.length));
    };
    const setPreviousClub = () => {
        if (clubIndexExists) setClubIndex(mod(clubIndex - 1, clubs.length));
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
        if (map && clubIndexExists) {
            debouncedMapFly(clubIndex);
        }

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
                <ClubsList
                    clubClickedFromList={(selectedIndex: number) => {
                        setClubIndex(selectedIndex);
                    }}
                />
            )}
            <AnimatePresence
                mode="wait"
                onExitComplete={() => console.log('Exit animation complete')}
            >
                <div>
                    {selectedClub && clubIndexExists && (
                        <motion.div
                            key={'swipeable-deck'}
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1,
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
                                items={clubs}
                                Card={SwipeableClubCard}
                                currentIndex={clubIndex}
                                onDownSwipeClose={() =>
                                    setTimeout(() => setClubIndex(null), 3000)
                                }
                                // change "true" to setClubIndex(null) whenever animations are figured out
                                // onUpSwipeClose={() => true}
                                onRightSwipe={() => setNextClub()}
                                onLeftSwipe={() => setPreviousClub()}
                            />
                        </motion.div>
                    )}
                </div>
            </AnimatePresence>
            {selectedClub && clubIndexExists && (
                <CustomPopup
                    clubIndex={clubIndex}
                    club={selectedClub}
                    clubs={clubs}
                    onClose={() => setClubIndex(null)}
                    switchNextClub={() => {
                        setNextClub();
                    }}
                    switchPreviousClub={() => {
                        setPreviousClub();
                    }}
                />
            )}
            <div className={`${styles.mapContainer} h-screen`} ref={mainMapRef}>
                <MapContainer
                    key={0}
                    center={centerCoords}
                    zoom={zoom}
                    zoomControl={false}
                    style={{ height: '100%', width: '100%' }}
                    ref={setMap}
                >
                    <ZoomControl position="bottomright" />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {clubs.map((club, index) => (
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
