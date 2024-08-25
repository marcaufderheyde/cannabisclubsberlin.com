'use client';
import React from 'react';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { LeafletMouseEventHandlerFn } from 'leaflet';

type Props = {
    index: number;
    location: number[];
    customIcon: L.Icon<L.IconOptions>;
    clickedOnMarker: LeafletMouseEventHandlerFn;
};

export default function CustomMarker(props: Props) {
    return (
        <Marker
            key={props.index}
            position={[props.location[0], props.location[1]]}
            icon={props.customIcon}
            eventHandlers={{
                click: props.clickedOnMarker,
            }}
        />
    );
}
