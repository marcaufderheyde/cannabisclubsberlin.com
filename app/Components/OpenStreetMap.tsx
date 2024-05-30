"use client"
import React, { useEffect, useState } from 'react';
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
  geoLocation: number[];
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

  let center = {
    lat: 52.516640,
    lng: 13.408280,
  };

  const zoom = 13;
  
  let clubIndex: number | undefined = undefined;

  if(selectedClub !== null && selectedClub) {
    clubIndex = clubs.findIndex((club) => club.slug === selectedClub.slug);
    console.log(clubIndex);
  }

  useEffect(() => {
    console.log(center);
    center = {
      lat: selectedClub?.geoLocation[0] as number,
      lng: selectedClub?.geoLocation[1] as number,
    };
    console.log(center);
  }, [selectedClub]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer key={clubIndex ? clubIndex : 0} center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
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
      {selectedClub && <CustomPopup clubIndex={clubIndex as unknown as string + "/" + clubs.length as string} club={selectedClub} onClose={() => setSelectedClub(null)} nextClub={() => ((clubIndex as number) + 1) > (clubs.length - 1) ? setSelectedClub(clubs[0]) : setSelectedClub(clubs[(clubIndex as number) + 1])}/>}
    </div>
  );
};

export default OpenStreetMap;
