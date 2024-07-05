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

export type Club = {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string;
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
    const [centerCoords, setCenterCoords] = useState<{
        lat: number;
        lng: number;
    }>({
        lat: 52.51664,
        lng: 13.40828,
    });

    const clubIndexExists = clubIndex != null;

    const clubsRef = useRef<Club[]>(pullClubsListContent());
    const clubs = clubsRef.current;
    const selectedClub = clubIndexExists && clubs[clubIndex];

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
    });

    const zoom = 13;

    const setNextClub = () => {
        if (clubIndexExists) setClubIndex(mod(clubIndex + 1, clubs.length));
    };
    const setPreviousClub = () => {
        if (clubIndexExists) setClubIndex(mod(clubIndex - 1, clubs.length));
    };

    useEffect(() => {
        if (map && clubIndexExists) {
            jumpToMarker(
                map,
                mainMapRef,
                clubIndex,
                clubs,
                setCenterCoords,
                props.isDesktopMap
            );
        }
    }, [clubIndex]);

    return (
        <div>
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
            <div className={styles.mapContainer} ref={mainMapRef}>
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
