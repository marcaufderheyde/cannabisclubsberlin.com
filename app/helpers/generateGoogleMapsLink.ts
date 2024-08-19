export default function generateGoogleMapsLink(destinationLat: number, destinationLng: number) {
    return `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`;
};