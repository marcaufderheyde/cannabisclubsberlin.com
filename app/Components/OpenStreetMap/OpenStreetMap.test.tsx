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
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    };

    const MapContainer = ({
        children,
        ref,
    }: {
        children: React.ReactNode;
        ref: any;
    }) => {
        React.useEffect(() => {
            if (ref && ref.current) {
                ref.current = mockMap;
            }
        }, [ref]);
        return React.createElement(
            'div',
            { 'data-testid': 'map-container' },
            children
        );
    };
    MapContainer.displayName = 'MockMapContainer';

    const TileLayer = () =>
        React.createElement('div', { 'data-testid': 'tile-layer' });
    TileLayer.displayName = 'MockTileLayer';

    const ZoomControl = () =>
        React.createElement('div', { 'data-testid': 'zoom-control' });
    ZoomControl.displayName = 'MockZoomControl';

    return { MapContainer, TileLayer, ZoomControl };
});

jest.mock('./CustomMarker', () => {
    const React = require('react');
    const CustomMarker = ({
        index,
        location,
        customIcon,
        clickedOnMarker,
    }: any) =>
        React.createElement('div', {
            'data-testid': `marker-${index}`,
            'data-location': location,
            'data-icon': customIcon.options.iconUrl,
            onClick: clickedOnMarker,
        });
    CustomMarker.displayName = 'MockCustomMarker';
    return CustomMarker;
});

jest.mock('../CustomPopup/CustomPopup', () => {
    const React = require('react');
    const CustomPopup = ({
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
    CustomPopup.displayName = 'MockCustomPopup';
    return CustomPopup;
});

jest.mock('next-intl', () => ({
    useTranslations: jest.fn(),
}));

jest.mock('@/app/components/OpenStreetMap/helpers/jumpToMarker', () =>
    jest.fn()
);

jest.mock('./SwipeableDeck', () => {
    const React = require('react');
    const SwipeableDeck = ({
        items,
        currentIndex,
        onDownSwipeClose,
        onRightSwipe,
        onLeftSwipe,
    }: any) =>
        React.createElement(
            'div',
            { 'data-testid': 'swipeable-deck' },
            React.createElement(
                'button',
                { onClick: onDownSwipeClose },
                'Close'
            ),
            React.createElement('button', { onClick: onRightSwipe }, 'Next'),
            React.createElement('button', { onClick: onLeftSwipe }, 'Previous'),
            React.createElement('span', {}, currentIndex)
        );
    SwipeableDeck.displayName = 'MockSwipeableDeck';
    return SwipeableDeck;
});

jest.mock('./DesktopClubList', () => {
    const React = require('react');
    const DesktopClubList = ({
        clubClickedFromList,
        setClubListExpanded,
        currentClubIndex,
    }: any) =>
        React.createElement(
            'div',
            { 'data-testid': 'desktop-club-list' },
            React.createElement(
                'button',
                { onClick: () => clubClickedFromList(0) },
                'Select Club 0'
            ),
            React.createElement(
                'button',
                { onClick: () => setClubListExpanded(true) },
                'Expand'
            ),
            React.createElement('span', {}, currentClubIndex)
        );
    DesktopClubList.displayName = 'MockDesktopClubList';
    return DesktopClubList;
});

describe('OpenStreetMap Component', () => {
    const mockClubs: Club[] = [
        {
            name: 'Club 1',
            slug: 'club-1',
            imageUrl: '/club1.jpg',
            geoLocation: [52.52, 13.405],
            hasHRInformation: true,
            offerings: ['Offering1', 'Offering2'],
            address: '',
        },
        {
            name: 'Club 2',
            slug: 'club-2',
            imageUrl: '/club2.jpg',
            geoLocation: [52.51, 13.404],
            hasHRInformation: true,
            offerings: ['Offering3', 'Offering4'],
            address: '',
        },
    ];

    const mockProps = {
        isDesktopMap: true,
        showHRInfo: false,
        isDarkMode: true,
        setIsDarkMode: jest.fn(),
    };

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
            render(<OpenStreetMap {...mockProps} />);
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
            render(<OpenStreetMap {...mockProps} />);
        });

        await act(async () => {
            fireEvent.click(screen.getByTestId('marker-0'));
        });

        await waitFor(() => {
            expect(screen.getByTestId('custom-popup')).toBeInTheDocument();
        });
    });

    it('should render SwipeableDeck when a marker is clicked on mobile', async () => {
        await act(async () => {
            render(<OpenStreetMap {...mockProps} isDesktopMap={false} />);
        });

        await act(async () => {
            fireEvent.click(screen.getByTestId('marker-0'));
        });

        await waitFor(() => {
            expect(screen.getByTestId('swipeable-deck')).toBeInTheDocument();
        });
    });

    it('should render DesktopClubList on desktop', async () => {
        await act(async () => {
            render(<OpenStreetMap {...mockProps} />);
        });

        expect(screen.getByTestId('desktop-club-list')).toBeInTheDocument();
    });

    it('should not render DesktopClubList on mobile', async () => {
        await act(async () => {
            render(<OpenStreetMap {...mockProps} isDesktopMap={false} />);
        });

        expect(
            screen.queryByTestId('desktop-club-list')
        ).not.toBeInTheDocument();
    });

    it('should render MapModeToggle', async () => {
        await act(async () => {
            render(<OpenStreetMap {...mockProps} />);
        });

        expect(
            screen.getByLabelText('Switch to light mode')
        ).toBeInTheDocument();
    });

    it('should call setIsDarkMode when MapModeToggle is clicked', async () => {
        await act(async () => {
            render(<OpenStreetMap {...mockProps} />);
        });

        const toggleButton = screen.getByLabelText('Switch to light mode');
        fireEvent.click(toggleButton);

        expect(mockProps.setIsDarkMode).toHaveBeenCalledWith(false);
    });
});
