import offsetMapCenter from '@/app/helpers/offsetMapCenter';
import { Map } from 'leaflet';
import { Club } from '../Components/OpenStreetMap';

/*

This function and offsetMapCenter.tsx were created using a combination of:
    1) https://github.com/Leaflet/Leaflet/issues/859
        - Github user mourner's second suggestion is the basis for this implementation
    2) https://gist.github.com/missinglink/7620340
        - This user's suggestion for getting the viewport width using jQuery helped me
        figure out the ReactJS equivalent using the "mainMapRef" in OpenStreetMap.tsx
    3) Figuring out how to reference the Map instance took me way longer than it should have, 
    thanks to resources such as:
        - https://stackoverflow.com/questions/65387165/how-do-i-get-a-react-leaflet-map-to-pan-to-a-new-center
        - https://stackoverflow.com/questions/72706321/how-to-access-leaflet-functionality-with-buttons-that-are-not-child-components-o/72708117#72708117
    I strongly believe that the reason that the map would reload every single time upon clicking a marker or using the arrow buttons
    to toggle between, was constantly checking the if conditional for clubIndex, and the use of their being a 'key' attribute on map that
    was variable and set to clubIndex, meaning any change to clubIndex meant a new unique map was being rendered. I am far from an expert 
    but this is my guessed solution.

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
