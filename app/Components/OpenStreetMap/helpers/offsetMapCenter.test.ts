import { Map, Point, LatLng } from 'leaflet';
import offsetMapCenter from './offsetMapCenter';

describe('offsetMapCenter', () => {
    let mockMapInstance: Map;
    const targetZoom = 13;
    const overlayHeight = 600;
    const overlayWidth = 800;
    const targetLocation = [52.52, 13.405];
    const mockProjectedPoint = new Point(100, 100);
    const mockUnprojectedLatLng = new LatLng(52.52, 13.405);

    beforeEach(() => {
        mockMapInstance = {
            project: jest.fn().mockReturnValue(mockProjectedPoint),
            unproject: jest.fn().mockReturnValue(mockUnprojectedLatLng),
        } as unknown as Map;
    });

    it('should offset map center correctly for desktop map', () => {
        const isDesktopMap = true;

        const result = offsetMapCenter(
            targetZoom,
            overlayHeight,
            overlayWidth,
            mockMapInstance,
            targetLocation,
            isDesktopMap
        );

        // Ensure the project method was called with the correct arguments
        expect(mockMapInstance.project).toHaveBeenCalledWith(
            { lat: targetLocation[0], lng: targetLocation[1] },
            targetZoom
        );

        // Ensure the unproject method was called with the correct offset point
        expect(mockMapInstance.unproject).toHaveBeenCalledWith(
            mockProjectedPoint.subtract([+overlayWidth / 6, 0]),
            targetZoom
        );

        // Ensure the result is the expected LatLng
        expect(result).toEqual(mockUnprojectedLatLng);
    });

    it('should offset map center correctly for non-desktop map (mobile)', () => {
        const isDesktopMap = false;

        const result = offsetMapCenter(
            targetZoom,
            overlayHeight,
            overlayWidth,
            mockMapInstance,
            targetLocation,
            isDesktopMap
        );

        // Ensure the project method was called with the correct arguments
        expect(mockMapInstance.project).toHaveBeenCalledWith(
            { lat: targetLocation[0], lng: targetLocation[1] },
            targetZoom
        );

        // Ensure the unproject method was called with the correct offset point
        expect(mockMapInstance.unproject).toHaveBeenCalledWith(
            mockProjectedPoint.subtract([0, -overlayHeight / 6]),
            targetZoom
        );

        // Ensure the result is the expected LatLng
        expect(result).toEqual(mockUnprojectedLatLng);
    });
});
