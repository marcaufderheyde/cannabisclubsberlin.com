import { Map } from 'leaflet';
import jumpToMarker from './jumpToMarker';
import offsetMapCenter from '@/app/Helpers/offsetMapCenter';
import { Club } from '../Components/OpenStreetMap';

jest.mock('@/app/helpers/offsetMapCenter');

describe('jumpToMarker', () => {
    let mockMap: Map;
    let mockMainMapRef: any;
    let mockSetSelectedClub: jest.Mock;
    let mockSetCenterCoords: jest.Mock;
    let mockSetClubIndex: jest.Mock;
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

        mockSetSelectedClub = jest.fn();
        mockSetCenterCoords = jest.fn();
        mockSetClubIndex = jest.fn();

        mockClub = {
            name: 'Test Club',
            slug: 'test-club',
            imageUrl: '/test.png',
            geoLocation: [52.52, 13.405],
            description: '',
            offerings: '',
            harm_reduction: '',
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
            mockClub,
            mockClubs,
            mockSetSelectedClub,
            mockSetCenterCoords,
            mockSetClubIndex,
            true
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
            mockClub,
            mockClubs,
            mockSetSelectedClub,
            mockSetCenterCoords,
            mockSetClubIndex,
            true
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
            mockClub,
            mockClubs,
            mockSetSelectedClub,
            mockSetCenterCoords,
            mockSetClubIndex,
            true
        );

        expect(mockSetCenterCoords).toHaveBeenCalledWith({
            lat: 52.52,
            lng: 13.405,
        });
    });

    it('should set the selected club correctly', () => {
        jumpToMarker(
            mockMap,
            mockMainMapRef,
            mockClub,
            mockClubs,
            mockSetSelectedClub,
            mockSetCenterCoords,
            mockSetClubIndex,
            true
        );

        expect(mockSetSelectedClub).toHaveBeenCalledWith(mockClub);
    });

    it('should set the club index correctly', () => {
        jumpToMarker(
            mockMap,
            mockMainMapRef,
            mockClub,
            mockClubs,
            mockSetSelectedClub,
            mockSetCenterCoords,
            mockSetClubIndex,
            true
        );

        expect(mockSetClubIndex).toHaveBeenCalledWith(0);
    });

    it('should handle non-existing club index correctly', () => {
        const nonExistingClub = {
            ...mockClub,
            slug: 'non-existing',
        };

        jumpToMarker(
            mockMap,
            mockMainMapRef,
            nonExistingClub,
            mockClubs,
            mockSetSelectedClub,
            mockSetCenterCoords,
            mockSetClubIndex,
            true
        );

        expect(mockSetClubIndex).toHaveBeenCalledWith(-1); // -1 indicates that the club was not found
    });
});
