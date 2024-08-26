'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L from 'leaflet';
import { useLocale, useTranslations } from 'next-intl';
import styles from './ClubCard.module.css';
import Image from 'next/image';
import { Club } from '../../helpers/clubsListContent';

const customIcon = L.icon({
    iconUrl: '/leaf-weed.png',

    iconSize: [38, 38],
    iconAnchor: [19, 37],
    popupAnchor: [-3, -36],
});

type ClubProps = {
    club: Club;
};

export default function ClubOpenStreetMap({ club }: ClubProps) {
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
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                url="https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=KFzeqoMZOcvot9qqW4I8"
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
                                <div className="flex justify-center items-center">
                                    <Image
                                        src={club.imageUrl}
                                        alt={club.name + ' Club Picture'}
                                        width={150}
                                        height={150}
                                        className={styles.mapCardImage}
                                    />
                                </div>
                                <div className={styles.mapCardContent}>
                                    <h3 className={styles.mapCardTitle}>
                                        {club.name}
                                    </h3>

                                    {club.offerings
                                        ?.toString()
                                        .split(',')
                                        .map((offering) => (
                                            <div
                                                key={offering}
                                                className="bg-lime-500 text-white rounded-xl py-1 px-2 self-center overflow-ellipsis"
                                            >
                                                {offering}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </a>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
