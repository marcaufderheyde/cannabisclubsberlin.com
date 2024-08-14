import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OpenStreetMap, { Club } from './OpenStreetMap';
import { useTranslations } from 'next-intl';
import { act } from '@testing-library/react';

jest.mock('react-leaflet', () => {
    const React = require('react');
    const mockMap = {
        setView: jest.fn(),
        getZoom: jest.fn(),
    };
    return {
        MapContainer: ({
            children,
            whenCreated,
        }: {
            children: React.ReactNode;
            whenCreated?: (map: any) => void;
        }) => {
            React.useEffect(() => {
                if (whenCreated) {
                    whenCreated(mockMap);
                }
            }, [whenCreated]);
            return React.createElement(
                'div',
                { 'data-testid': 'map-container' },
                children
            );
        },
        TileLayer: () =>
            React.createElement('div', { 'data-testid': 'tile-layer' }),
        ZoomControl: () =>
            React.createElement('div', { 'data-testid': 'zoom-control' }),
    };
});

jest.mock('./CustomMarker', () => {
    const React = require('react');
    return ({ index, location, customIcon, clickedOnMarker }: any) =>
        React.createElement('div', {
            'data-testid': `marker-${index}`,
            'data-location': location,
            'data-icon': customIcon.options.iconUrl,
            onClick: clickedOnMarker,
        });
});

jest.mock('./CustomPopup', () => {
    const React = require('react');
    return ({
        club,
        onClose,
        switchNextClub,
        switchPreviousClub,
        clubIndex,
    }: any) =>
        React.createElement(
            'div',
            { 'data-testid': 'custom-popup' },
            React.createElement('button', { onClick: onClose }, 'Close'),
            React.createElement('button', { onClick: switchNextClub }, 'Next'),
            React.createElement(
                'button',
                { onClick: switchPreviousClub },
                'Previous'
            ),
            React.createElement('span', {}, clubIndex)
        );
});

jest.mock('next-intl', () => ({
    useTranslations: jest.fn(),
}));

jest.mock('../helpers/jumpToMarker', () => jest.fn());

describe('OpenStreetMap Component', () => {
    const mockClubs: Club[] = [
        {
            name: 'Club 1',
            slug: 'club-1',
            imageUrl: '/club1.jpg',
            geoLocation: [52.52, 13.405],
        },
        {
            name: 'Club 2',
            slug: 'club-2',
            imageUrl: '/club2.jpg',
            geoLocation: [52.51, 13.404],
        },
    ];

    beforeEach(() => {
        (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
        jest.spyOn(
            require('@/app/helpers/clubsListContent'),
            'pullClubsListContent'
        ).mockReturnValue(mockClubs);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the map and markers correctly', async () => {
        await act(async () => {
            render(<OpenStreetMap isDesktopMap={true} />);
        });

        expect(screen.getByTestId('map-container')).toBeInTheDocument();
        expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
        expect(screen.getByTestId('zoom-control')).toBeInTheDocument();

        mockClubs.forEach((_, index) => {
            expect(screen.getByTestId(`marker-${index}`)).toBeInTheDocument();
        });
    });

    it('should render CustomPopup when a marker is clicked', async () => {
        await act(async () => {
            render(<OpenStreetMap isDesktopMap={true} />);
        });

        await act(async () => {
            fireEvent.click(screen.getByTestId('marker-0'));
        });

        await waitFor(() => {
            expect(screen.getByTestId('custom-popup')).toBeInTheDocument();
        });
    });

    it('should trigger jumpToMarker with correct args on marker click', async () => {
        const mockJumpToMarker = require('../helpers/jumpToMarker');

        await act(async () => {
            render(<OpenStreetMap isDesktopMap={true} />);
        });

        await act(async () => {
            fireEvent.click(screen.getByTestId('marker-0'));
        });

        await waitFor(() =>
            expect(mockJumpToMarker).toHaveBeenCalledWith(
                expect.any(Object), // map instance
                expect.any(Object), // mainMapRef
                expect.objectContaining({ slug: 'club-1' }), // club 1
                expect.any(Array), // clubs
                expect.any(Function), // setSelectedClub
                expect.any(Function), // setCenterCoords
                expect.any(Function), // setClubIndex
                true // isDesktopMap
            )
        );
    });
});
