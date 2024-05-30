"use client"
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L from 'leaflet';
import { pullClubsListContent } from '../[locale]/clubs/clubsListContent';
import { useLocale, useTranslations } from 'next-intl';
import styles from '@/app/[locale]/clubs/ClubCard.module.css';
import CustomPopup from './CustomPopup'; // Import the custom popup component

interface Club {
  name: string;
  slug: string;
  imageUrl: string;
  geoLocation: [number, number];
  description?: string;
  offerings?: string;
  harm_reduction?: string;
}

const customIcon = L.icon({
  iconUrl: '/leaf-weed.png',
  iconSize: [38, 38], // size of the icon
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
});

const OpenStreetMap: React.FC = () => {
  const t = useTranslations('ClubsPage');
  const localActive = useLocale();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const clubs: Club[] = pullClubsListContent();

  clubs.forEach((club) => {
    club.description = t(`${club.slug}.description`);
    club.offerings = t(`${club.slug}.offerings`);
    club.harm_reduction = t(`${club.slug}.harm_reduction`);
  });

  const locations = clubs.map((club) => {
    return { lat: club.geoLocation[0], lng: club.geoLocation[1], club: club };
  });

  const center = {
    lat: 52.516640,
    lng: 13.408280,
  };

  const zoom = 13;

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker 
            key={index} 
            position={[location.lat, location.lng]} 
            icon={customIcon}
            eventHandlers={{
              click: () => {
                setSelectedClub(location.club);
              },
            }}
          />
        ))}
      </MapContainer>
      {selectedClub && <CustomPopup club={selectedClub} onClose={() => setSelectedClub(null)} />}
    </div>
  );
};

export default OpenStreetMap;
