'use client';
import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L, { Map } from 'leaflet';
import { pullClubsListContent } from '../[locale]/clubs/clubsListContent';
import { useLocale, useTranslations } from 'next-intl';
import styles from '@/app/[locale]/clubs/ClubCard.module.css';
import CustomPopup from './CustomPopup'; // Import the custom popup component
import CustomMarker from './CustomMarker';
import jumpToMarker from '../helpers/jumpToMarker';

interface Club {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string;
    harm_reduction?: string;
}

const customIcon = L.icon({
    iconUrl: '/leaf-weed.png',
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -37], // point from which the popup should open relative to the iconAnchor
});

const OpenStreetMap: React.FC = () => {
    const mainMapRef = useRef(null);
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
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

    const locations = clubs.map((club) => {
        return {
            lat: club.geoLocation[0],
            lng: club.geoLocation[1],
            club: club,
        };
    });

    const zoom = 13;

    function getNextClub(clubIndex: any, clubs: Club[]) {
        let nextClub;
        // cycle back to start of clubs if we hit array end
        nextClub =
            (clubIndex as number) + 1 > clubs.length - 1
                ? clubs[0]
                : clubs[(clubIndex as number) + 1];
        return {
            lat: nextClub.geoLocation[0],
            lng: nextClub.geoLocation[1],
            club: nextClub,
        };
    }

    function getPreviousClub(clubIndex: any, clubs: Club[]) {
        let previousClub;
        // cycle back to end of clubs if we hit array start
        previousClub =
            (clubIndex as number) - 1 < 0
                ? clubs[clubs.length - 1]
                : clubs[(clubIndex as number) - 1];
        return {
            lat: previousClub.geoLocation[0],
            lng: previousClub.geoLocation[1],
            club: previousClub,
        };
    }

    return (
        <div className={styles.mapContainer} ref={mainMapRef}>
            <MapContainer
                key={0}
                center={centerCoords}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                ref={setMap}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location, index) => (
                    <CustomMarker
                        index={index}
                        location={location}
                        customIcon={customIcon}
                        clickedOnMarker={() => {
                            jumpToMarker(
                                map,
                                mainMapRef,
                                location,
                                clubs,
                                setSelectedClub,
                                setCenterCoords,
                                setClubIndex
                            );
                        }}
                    />
                ))}
            </MapContainer>
            {selectedClub && (
                <CustomPopup
                    clubIndex={
                        ((clubIndex as unknown as string) +
                            '/' +
                            clubs.length) as string
                    }
                    club={selectedClub}
                    onClose={() => setSelectedClub(null)}
                    switchNextClub={() => {
                        let nextClubLocation = getNextClub(clubIndex, clubs);
                        jumpToMarker(
                            map,
                            mainMapRef,
                            nextClubLocation,
                            clubs,
                            setSelectedClub,
                            setCenterCoords,
                            setClubIndex
                        );
                    }}
                    switchPreviousClub={() => {
                        let previousClubLocation = getPreviousClub(
                            clubIndex,
                            clubs
                        );
                        jumpToMarker(
                            map,
                            mainMapRef,
                            previousClubLocation,
                            clubs,
                            setSelectedClub,
                            setCenterCoords,
                            setClubIndex
                        );
                    }}
                />
            )}
        </div>
    );
};

export default OpenStreetMap;
