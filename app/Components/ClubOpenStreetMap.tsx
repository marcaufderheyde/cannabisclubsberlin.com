'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L from 'leaflet';
import { useLocale, useTranslations } from 'next-intl';
import styles from '@/app/styles/ClubCard.module.css';
import Image from 'next/image';
import { Club } from '@/app/helpers/clubsListContent';

const customIcon = L.icon({
    iconUrl: '/leaf-weed.png',

    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -36], // point from which the popup should open relative to the iconAnchor
});

type Props = {
    club: Club;
};

const ClubOpenStreetMap = ({ club }: Props) => {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();

    const center = {
        lat: club.geoLocation[0],
        lng: club.geoLocation[1],
    };

    const zoom = 13;

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '200px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker
                key={club.key}
                position={[club.geoLocation[0], club.geoLocation[1]]}
                icon={customIcon}
            >
                <Popup>
                    <a
                        href={`/${localActive}/clubs/${club.slug}`}
                        key={club.slug}
                    >
                        <div className="flex justify-center items-center">
                            <div className={styles.mapCard} key={club.key}>
                                <div className={styles.cardNumber}>
                                    #{club.key}
                                </div>
                                <div className="flex justify-center items-center">
                                    <Image
                                        src={club.imageUrl}
                                        alt={club.name + ' Club Picture'}
                                        width={300}
                                        height={300}
                                        className={styles.mapCardImage}
                                    />
                                </div>
                                <div className={styles.mapCardContent}>
                                    <h3 className={styles.mapCardTitle}>
                                        {club.name}
                                    </h3>
                                    <p className={styles.mapCardDescription}>
                                        {club.offerings}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default ClubOpenStreetMap;
