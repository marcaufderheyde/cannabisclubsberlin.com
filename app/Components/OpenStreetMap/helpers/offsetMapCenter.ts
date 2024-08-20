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
        ? mapInstance!
              .project(targetLatLng, targetZoom)
              .subtract([-overlayWidth / 6, 0])
        : mapInstance!
              .project(targetLatLng, targetZoom)
              .subtract([0, -overlayHeight / 6]);
    const offsetTargetLatLng: LatLng = mapInstance!.unproject(
        targetPoint,
        targetZoom
    );
    return offsetTargetLatLng;
}
