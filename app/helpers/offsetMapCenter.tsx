export default function offsetMapCenter(
    targetZoom: any,
    overlayHeight: any,
    mapInstance: any,
    targetLocation: any
) {
    var targetLatLng = {
        lat: targetLocation.lat,
        lng: targetLocation.lng,
    };
    var targetPoint: any = mapInstance
        .project(targetLatLng, targetZoom)
        .subtract([0, -overlayHeight / 3]);
    var offsetTargetLatLng: any = mapInstance.unproject(
        targetPoint,
        targetZoom
    );
    return offsetTargetLatLng;
}
