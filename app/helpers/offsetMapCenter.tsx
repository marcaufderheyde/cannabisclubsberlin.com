import { LatLng, Map, Point } from 'leaflet';

export default function offsetMapCenter(
    targetZoom: number,
    overlayHeight: number,
    overlayWidth: number,
    mapInstance: Map | null,
    targetLocation: number[],
    isDesktopMap: boolean
) {
    const targetLatLng = {
        lat: targetLocation[0],
        lng: targetLocation[1],
    };

    const targetPoint: Point = isDesktopMap
        ? (mapInstance!
              .project(targetLatLng, targetZoom)
              .subtract([+overlayHeight / 3, 0]))
        : (mapInstance!
              .project(targetLatLng, targetZoom)
              .subtract([0, -overlayWidth / 3]));
    const offsetTargetLatLng: LatLng = mapInstance!.unproject(
        targetPoint,
        targetZoom
    );
    return offsetTargetLatLng;
}
