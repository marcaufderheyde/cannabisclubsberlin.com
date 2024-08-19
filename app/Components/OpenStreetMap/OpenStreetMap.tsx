'use client';
import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L, { Map } from 'leaflet';
import { useTranslations } from 'next-intl';
import styles from './ClubCard.module.css';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import jumpToMarker from '@/app/components/OpenStreetMap/helpers/jumpToMarker';
import CustomPopup from '../CustomPopup/CustomPopup';
import CustomMarker from './CustomMarker';

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
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
    });

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
            {selectedClub && clubIndex !== null && (
                <CustomPopup
                    clubIndex={`${clubIndex + 1}/${clubs.length}`}
                    club={selectedClub}
                    onClose={() => setSelectedClub(null)}
                    switchNextClub={() => {
                        const nextClub: Club = getNextClub(clubIndex, clubs);
                        jumpToMarker(
                            map,
                            mainMapRef,
                            nextClub,
                            clubs,
                            setSelectedClub,
                            setCenterCoords,
                            setClubIndex,
                            props.isDesktopMap
                        );
                    }}
                    switchPreviousClub={() => {
                        const previousClub: Club = getPreviousClub(
                            clubIndex,
                            clubs
                        );
                        jumpToMarker(
                            map,
                            mainMapRef,
                            previousClub,
                            clubs,
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
                    ref={(mapInstance) => {
                        if (mapInstance) {
                            setMap(mapInstance);
                        }
                    }}
                >
                    <ZoomControl position="bottomright" />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {clubs.map((club, index) => (
                        <CustomMarker
                            key={club.slug}
                            index={index}
                            location={club.geoLocation}
                            customIcon={
                                selectedClub && club.slug === selectedClub.slug
                                    ? selectedIcon
                                    : customIcon
                            }
                            clickedOnMarker={() => {
                                setSelectedClub(club); // Explicitly set the selected club
                                setClubIndex(index); // Explicitly set the club index
                                jumpToMarker(
                                    map,
                                    mainMapRef,
                                    club,
                                    clubs,
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
