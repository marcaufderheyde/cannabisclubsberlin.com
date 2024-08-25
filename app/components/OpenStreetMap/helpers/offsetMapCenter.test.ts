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
            project: jest.fn().mockReturnValue(mockProjectedPoint.clone()),
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

        expect(mockMapInstance.project).toHaveBeenCalledWith(
            { lat: targetLocation[0], lng: targetLocation[1] },
            targetZoom
        );

        // Create a new point with expected values after subtraction
        const expectedPoint = new Point(
            mockProjectedPoint.x + overlayWidth / 6,
            mockProjectedPoint.y
        );

        expect(mockMapInstance.unproject).toHaveBeenCalledWith(
            expectedPoint,
            targetZoom
        );

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

        expect(mockMapInstance.project).toHaveBeenCalledWith(
            { lat: targetLocation[0], lng: targetLocation[1] },
            targetZoom
        );

        // Create a new point with expected values after subtraction
        const expectedPoint = new Point(
            mockProjectedPoint.x,
            mockProjectedPoint.y + overlayHeight / 6
        );

        expect(mockMapInstance.unproject).toHaveBeenCalledWith(
            expectedPoint,
            targetZoom
        );

        expect(result).toEqual(mockUnprojectedLatLng);
    });
});
