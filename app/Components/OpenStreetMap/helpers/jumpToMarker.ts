import { Map } from 'leaflet';
import { Club } from '../OpenStreetMap';
import offsetMapCenter from './offsetMapCenter';

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
    nextClub: Club,
    clubs: Club[],
    setSelectedClub: any,
    setCenterCoords: any,
    setClubIndex: any,
    isDesktopMap: boolean
) {
    const targetZoom: number = map!.getZoom();
    const overlayHeight: number = mainMapRef.current.offsetHeight;
    const overlayWidth: number = mainMapRef.current.offsetWidth;

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

    const selectedClub = nextClub;
    setSelectedClub(selectedClub);

    // make sure current club index is stored, for popup club switcher
    const clubIndex = clubs.findIndex(
        (club: Club) => club.slug === selectedClub.slug
    );
    setClubIndex(clubIndex);
}
