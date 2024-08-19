import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClubOpenStreetMap from './ClubOpenStreetMap';
import { useLocale, useTranslations } from 'next-intl';

jest.mock('react-leaflet', () => {
    const React = require('react');
    return {
        MapContainer: ({ children }: { children: React.ReactNode }) =>
            React.createElement(
                'div',
                { 'data-testid': 'map-container' },
                children
            ),
        TileLayer: () =>
            React.createElement('div', { 'data-testid': 'tile-layer' }),
        Marker: ({ children }: { children: React.ReactNode }) =>
            React.createElement('div', { 'data-testid': 'marker' }, children),
        Popup: ({ children }: { children: React.ReactNode }) =>
            React.createElement('div', { 'data-testid': 'popup' }, children),
    };
});

jest.mock('next/image', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: ({ src, alt }: { src: string; alt: string }) =>
            React.createElement('img', { 'data-testid': 'image', src, alt }),
    };
});

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
    useTranslations: jest.fn(),
}));

describe('ClubOpenStreetMap Component', () => {
    const mockClub = {
        key: 'club1',
        name: 'CSC High Ground Berlin e.V.',
        prices: '',
        location: '',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club1.png',
        clubPageUrl: 'https://csc-highground.de/',
        slug: '',
        address: '',
        geoLocation: [52.51664, 13.40828],
    };

    beforeEach(() => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    });

    it('should render the map with the correct components', () => {
        render(<ClubOpenStreetMap club={mockClub} />);

        expect(screen.getByTestId('map-container')).toBeInTheDocument();
        expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
        expect(screen.getByTestId('marker')).toBeInTheDocument();
        expect(screen.getByTestId('popup')).toBeInTheDocument();
    });

    it('should render the Popup with the correct content', () => {
        render(<ClubOpenStreetMap club={mockClub} />);

        expect(screen.getAllByText(`#${mockClub.key}`).length).toBeGreaterThan(
            0
        );
        expect(screen.getByText(mockClub.name)).toBeInTheDocument();
        expect(screen.getAllByText(mockClub.offerings).length).toBeGreaterThan(
            0
        );
    });

    it('should render the Image with correct props', () => {
        render(<ClubOpenStreetMap club={mockClub} />);

        const image = screen.getByTestId('image');
        expect(image).toHaveAttribute('src', mockClub.imageUrl);
        expect(image).toHaveAttribute('alt', `${mockClub.name} Club Picture`);
    });
});
