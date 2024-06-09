'use client';
import React from 'react';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

type Props = {
    index: any;
    location: any;
    customIcon: any;
    clickedOnMarker: any;
};

const CustomMarker = (props: Props) => {
    return (
        <Marker
            key={props.index}
            position={[props.location.lat, props.location.lng]}
            icon={props.customIcon}
            eventHandlers={{
                click: () => {
                    props.clickedOnMarker();
                },
            }}
        />
    );
};

export default CustomMarker;
