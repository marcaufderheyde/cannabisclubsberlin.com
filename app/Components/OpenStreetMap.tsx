import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L, { icon } from 'leaflet'

const customIcon = L.icon({
  iconUrl: '/leaf-green.png',
  shadowUrl: '/leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const OpenStreetMap = () => {
  const locations = [
    { lat: 52.516640, lng: 13.408280, popup: "csc-high-ground-berlin-ev" },
    { lat: 52.461281, lng: 13.364280, popup: "green-social-club-ev-im-norden-von-berlin" },
    { lat: 52.502200, lng: 13.319330, popup: "aero-cannabis-club-ev" },
  ];
  
  const center = {
    lat: 52.516640,
    lng: 13.408280,
  };

  const zoom = 13;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng] } icon={customIcon}
        >
          <Popup>{location.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMap;
