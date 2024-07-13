'use client';
import React, { useRef, useState } from 'react';
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

export type Club = {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string;
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

export default function OpenStreetMap(props: OpenStreetMapProps) {
    const mainMapRef = useRef(null);
    const t = useTranslations('ClubsPage');
    const [map, setMap] = useState<Map | null>(null);
    const [selectedClub, setSelectedClub] = useState<Club | null>(null);
    const [clubIndex, setClubIndex] = useState<number | null>(null);
    const [centerCoords, setCenterCoords] = useState<{
        lat: number;
        lng: number;
    }>({
        lat: 52.51664,
        lng: 13.40828,
    });

    const clubs: Club[] = pullClubsListContent();

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
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

    function getNextClub(clubIndex: number, clubs: Club[]): Club {
        return clubIndex + 1 > clubs.length - 1
            ? clubs[0]
            : clubs[clubIndex + 1];
    }

    function getPreviousClub(clubIndex: number, clubs: Club[]): Club {
        return clubIndex - 1 < 0
            ? clubs[clubs.length - 1]
            : clubs[clubIndex - 1];
    }

    return (
        <div>
            {selectedClub && clubIndex != null && (
                <CustomPopup
                    clubIndex={
                        (((clubIndex + 1) as unknown as string) +
                            '/' +
                            filteredClubs.length) as string
                    }
                    club={selectedClub}
                    onClose={() => setSelectedClub(null)}
                    switchNextClub={() => {
                        const nextClub: Club = getNextClub(
                            clubIndex,
                            filteredClubs
                        );
                        jumpToMarker(
                            map,
                            mainMapRef,
                            nextClub,
                            filteredClubs,
                            setSelectedClub,
                            setCenterCoords,
                            setClubIndex,
                            props.isDesktopMap
                        );
                    }}
                    switchPreviousClub={() => {
                        const previousClub: Club = getPreviousClub(
                            clubIndex,
                            filteredClubs
                        );
                        jumpToMarker(
                            map,
                            mainMapRef,
                            previousClub,
                            filteredClubs,
                            setSelectedClub,
                            setCenterCoords,
                            setClubIndex,
                            props.isDesktopMap
                        );
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
                                jumpToMarker(
                                    map,
                                    mainMapRef,
                                    club,
                                    filteredClubs,
                                    setSelectedClub,
                                    setCenterCoords,
                                    setClubIndex,
                                    props.isDesktopMap
                                );
                            }}
                        />
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
