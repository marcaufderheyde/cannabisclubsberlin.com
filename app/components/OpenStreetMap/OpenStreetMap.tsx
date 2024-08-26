'use client';
import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L, { Map } from 'leaflet';
import { useTranslations } from 'next-intl';
import styles from './ClubCard.module.css';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import jumpToMarker from '@/app/components/OpenStreetMap/helpers/jumpToMarker';
import CustomPopup from '@/app/components/CustomPopup/CustomPopup';
import CustomMarker from '@/app/components/OpenStreetMap/CustomMarker';
import { AnimatePresence, motion } from 'framer-motion';
import mod from '@/app/helpers/mod';
import withMotion from '@/app/components/WithMotion/WithMotion';
import useDebounceFunction from '@/app/helpers/useDebounceFunction';
import DesktopClubList from '@/app/components/OpenStreetMap/DesktopClubList';
import SwipeableClubCard from '@/app/components/OpenStreetMap/SwipeableClubCard';
import SwipeableDeck from '@/app/components/OpenStreetMap/SwipeableDeck';
import MapModeToggle from '@/app/components/OpenStreetMap/MapModeToggle';

export type Club = {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string[];
    harm_reduction?: string;
    hasHRInformation: boolean;
    address: string;
};

const customIcon: L.Icon<L.IconOptions> = L.icon({
    iconUrl: '/leaf-weed.png',
    iconSize: [38, 38],
    iconAnchor: [19, 37],
    popupAnchor: [0, -37],
});

const selectedIcon: L.Icon<L.IconOptions> = L.icon({
    iconUrl: '/leaf-weed-selected.png',
    iconSize: [38, 38],
    iconAnchor: [19, 37],
    popupAnchor: [0, -37],
});

type OpenStreetMapProps = {
    isDesktopMap: boolean;
    showHRInfo: boolean;
    isDarkMode: boolean;
    setIsDarkMode: Dispatch<SetStateAction<boolean>>;
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

    const clubsRef = useRef<Club[]>(
        pullClubsListContent().map((club) => ({
            ...club,
            offerings:
                typeof club.offerings === 'string'
                    ? club.offerings.split(', ')
                    : [], // Ensure offerings is an array
        }))
    );

    const clubs = clubsRef.current;

    // const MotionSwipableDeck = withMotion(SwipeableDeck);

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        let clubOfferings = t(`${club.slug}.offerings`);
        const pattern = /, |and /;
        club.offerings = clubOfferings.split(pattern);
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
        if (
            club.harm_reduction ===
                'This club has currently not listed any specific harm reduction services.' ||
            club.harm_reduction ===
                'Dieser Club hat derzeit keine speziellen Dienste zur Schadensminderung aufgelistet.'
        ) {
            club.hasHRInformation = false;
        } else {
            club.hasHRInformation = true;
        }
    });

    const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        const newFilteredClubs = props.showHRInfo
            ? clubs.filter((club) => club.hasHRInformation)
            : clubs;
        setFilteredClubs(newFilteredClubs);
        setIsFiltering(true);
        setClubIndex(null);

        // Reset filtering state after a short delay
        const timer = setTimeout(() => {
            setIsFiltering(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [props.showHRInfo, clubs]);

    const selectedClub = clubIndexExists && filteredClubs[clubIndex!];

    const zoom = 13;

    const setNextClub = useCallback(() => {
        if (clubIndexExists)
            setClubIndex(mod(clubIndex! + 1, filteredClubs.length));
    }, [clubIndex, clubIndexExists, filteredClubs.length]);

    const setPreviousClub = useCallback(() => {
        if (clubIndexExists)
            setClubIndex(mod(clubIndex! - 1, filteredClubs.length));
    }, [clubIndex, clubIndexExists, filteredClubs.length]);

    const debouncedMapFly = useDebounceFunction(
        (clubIndex) =>
            jumpToMarker(
                map,
                mainMapRef,
                clubIndex,
                filteredClubs,
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
    }, [clubIndex, map, setNextClub, setPreviousClub, clubIndexExists]);

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
                <div className="absolute flex flex-row flex-nowrap justify-end items-stretch right-0 top-[var(--navbar-height)] dynamic-height z-[2005]">
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
                        filteredClubs={filteredClubs}
                    />
                </div>
            )}
            <AnimatePresence
                mode="sync"
                onExitComplete={() => console.log('Exit animation complete')}
            >
                {selectedClub && clubIndexExists && !isFiltering && (
                    <motion.div
                        key="swipeable-deck"
                        initial={{ '--deck-opacity': 0 } as any}
                        animate={{ '--deck-opacity': 1 } as any}
                        exit={{ '--deck-opacity': 0 } as any}
                        transition={{
                            duration: 0.2,
                            ease: 'easeOut',
                        }}
                    >
                        <SwipeableDeck
                            style={{ opacity: 'var(--deck-opacity)' }}
                            items={filteredClubs}
                            Card={SwipeableClubCard}
                            currentIndex={clubIndex!}
                            onDownSwipeClose={() => setClubIndex(null)}
                            onRightSwipe={() => setPreviousClub()}
                            onLeftSwipe={() => setNextClub()}
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
                    ref={(mapInstance) => {
                        if (mapInstance) {
                            setMap(mapInstance);
                        }
                    }}
                >
                    <ZoomControl position="bottomright" />
                    <TileLayer
                        url={
                            props.isDarkMode
                                ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        }
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {filteredClubs.map((club, index) => (
                        <CustomMarker
                            key={index}
                            index={index}
                            location={club.geoLocation}
                            customIcon={
                                selectedClub && club.slug === selectedClub.slug
                                    ? selectedIcon
                                    : customIcon
                            }
                            clickedOnMarker={() => {
                                setClubIndex(index);
                            }}
                        />
                    ))}
                </MapContainer>
                <MapModeToggle
                    isDarkMode={props.isDarkMode}
                    setIsDarkMode={props.setIsDarkMode}
                />
            </div>
        </div>
    );
}
