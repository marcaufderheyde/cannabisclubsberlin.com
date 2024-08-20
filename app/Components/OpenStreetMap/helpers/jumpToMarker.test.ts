import { Map } from 'leaflet';
import jumpToMarker from './jumpToMarker';
import { Club } from '../OpenStreetMap';
import offsetMapCenter from './offsetMapCenter';

jest.mock('./offsetMapCenter');

describe('jumpToMarker', () => {
    let mockMap: Map;
    let mockMainMapRef: any;
    let mockSetCenterCoords: jest.Mock;
    let mockClub: Club;
    let mockClubs: Club[];

    beforeEach(() => {
        mockMap = {
            getZoom: jest.fn().mockReturnValue(13),
            flyTo: jest.fn(),
        } as unknown as Map;

        mockMainMapRef = {
            current: {
                offsetHeight: 500,
                offsetWidth: 800,
            },
        };

        mockSetCenterCoords = jest.fn();

        mockClub = {
            name: 'Test Club',
            slug: 'test-club',
            imageUrl: '/test.png',
            geoLocation: [52.52, 13.405],
            description: '',
            offerings: [''],
            harm_reduction: '',
            hasHRInformation: true,
            address: '',
        };

        mockClubs = [mockClub, { ...mockClub, slug: 'another-club' }];

        (offsetMapCenter as jest.Mock).mockReturnValue({
            lat: 52.52,
            lng: 13.405,
        });
    });

    it('should call offsetMapCenter with correct arguments', () => {
        jumpToMarker(
            mockMap,
            mockMainMapRef,
            0, // nextClubIndex
            mockClubs,
            mockSetCenterCoords,
            true, // isDesktopMap
            13 // zoom
        );

        expect(offsetMapCenter).toHaveBeenCalledWith(
            13, // targetZoom
            500, // overlayHeight
            800, // overlayWidth
            mockMap, // map instance
            mockClub.geoLocation, // club geoLocation
            true // isDesktopMap
        );
    });

    it('should call map.flyTo with correct arguments', () => {
        jumpToMarker(
            mockMap,
            mockMainMapRef,
            0, // nextClubIndex
            mockClubs,
            mockSetCenterCoords,
            true, // isDesktopMap
            13 // zoom
        );

        expect(mockMap.flyTo).toHaveBeenCalledWith(
            { lat: 52.52, lng: 13.405 },
            13 // targetZoom
        );
    });

    it('should set the center coordinates correctly', () => {
        jumpToMarker(
            mockMap,
            mockMainMapRef,
            0, // nextClubIndex
            mockClubs,
            mockSetCenterCoords,
            true, // isDesktopMap
            13 // zoom
        );

        expect(mockSetCenterCoords).toHaveBeenCalledWith({
            lat: 52.52,
            lng: 13.405,
        });
    });

    it('should handle a non-existing club index without errors', () => {
        jumpToMarker(
            mockMap,
            mockMainMapRef,
            10, // non-existing index
            mockClubs,
            mockSetCenterCoords,
            true, // isDesktopMap
            13 // zoom
        );

        expect(mockMap.flyTo).not.toHaveBeenCalled();
        expect(mockSetCenterCoords).not.toHaveBeenCalled();
    });
});
