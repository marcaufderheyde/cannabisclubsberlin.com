import { LatLng, Map, Point } from 'leaflet';

export default function offsetMapCenter(
    targetZoom: number,
    overlayHeight: number,
    mapInstance: Map | null,
    targetLocation: number[]
) {
    const targetLatLng = {
        lat: targetLocation[0],
        lng: targetLocation[1],
    };
    const targetPoint: Point = mapInstance!
        .project(targetLatLng, targetZoom)
        .subtract([0, -overlayHeight / 3]);
    const offsetTargetLatLng: LatLng = mapInstance!.unproject(
        targetPoint,
        targetZoom
    );
    return offsetTargetLatLng;
}
