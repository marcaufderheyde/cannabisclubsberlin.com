import generateGoogleMapsLink from './generateGoogleMapsLink';

describe('generateGoogleMapsLink', () => {
    it('should generate a valid Google Maps link with the correct latitude and longitude', () => {
        const latitude = 52.5200;
        const longitude = 13.4050;
        const expectedLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        const result = generateGoogleMapsLink(latitude, longitude);

        expect(result).toBe(expectedLink);
    });

    it('should generate a link with negative latitude and longitude', () => {
        const latitude = -33.8688;
        const longitude = -151.2093;
        const expectedLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        const result = generateGoogleMapsLink(latitude, longitude);

        expect(result).toBe(expectedLink);
    });

    it('should handle zero as a valid coordinate', () => {
        const latitude = 0;
        const longitude = 0;
        const expectedLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        const result = generateGoogleMapsLink(latitude, longitude);

        expect(result).toBe(expectedLink);
    });

    it('should generate a link with high precision coordinates', () => {
        const latitude = 52.5200066;
        const longitude = 13.404954;
        const expectedLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        const result = generateGoogleMapsLink(latitude, longitude);

        expect(result).toBe(expectedLink);
    });
});
