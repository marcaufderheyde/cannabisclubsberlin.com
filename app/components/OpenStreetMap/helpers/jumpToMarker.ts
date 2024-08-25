import { Map } from 'leaflet';
import offsetMapCenter from './offsetMapCenter';
import { Club } from '../OpenStreetMap';

/*
This function and offsetMapCenter.tsx were created using a combination of:
    1) https://github.com/Leaflet/Leaflet/issues/859
        - Github user mourner's second suggestion is the basis for this implementation
    2) https://gist.github.com/missinglink/7620340
        - This user's suggestion for getting the viewport width using jQuery helped me
        figure out the ReactJS equivalent using the "mainMapRef" in OpenStreetMap.tsx
*/

export default function jumpToMarker(
    map: Map | null,
    mainMapRef: any,
    nextClubIndex: any,
    clubs: Club[],
    setCenterCoords: any,
    isDesktopMap: boolean,
    zoom: number
) {
    const targetZoom: number = zoom;
    const overlayHeight: number = mainMapRef.current.offsetHeight;
    const overlayWidth: number = mainMapRef.current.offsetWidth;

    const nextClub = clubs[nextClubIndex];

    if (nextClub) {
        const offsetTargetLatLng = offsetMapCenter(
            targetZoom,
            overlayHeight,
            overlayWidth,
            map,
            nextClub.geoLocation,
            isDesktopMap
        );

        map!.flyTo(offsetTargetLatLng, targetZoom);
        setCenterCoords({
            lat: offsetTargetLatLng.lat,
            lng: nextClub.geoLocation[1],
        });
    }
}
