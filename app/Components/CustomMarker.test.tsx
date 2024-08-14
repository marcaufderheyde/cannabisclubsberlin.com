import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomMarker from './CustomMarker';
import L from 'leaflet'; // Importing L from leaflet

// Mocking react-leaflet components
jest.mock('react-leaflet', () => {
    const React = require('react');
    return {
        Marker: ({ position, icon, eventHandlers, children }: any) =>
            React.createElement(
                'div',
                {
                    'data-testid': 'marker',
                    'data-position': position,
                    'data-icon': icon.options.iconUrl,
                    onClick: eventHandlers.click,
                },
                children
            ),
    };
});

function convertLocationArrayToString(location: number[]) {
    return location[0] + ',' + location[1];
}

describe('CustomMarker Component', () => {
    const mockProps = {
        index: 1,
        location: [52.52, 13.405],
        customIcon: L.icon({
            iconUrl: '/leaf-weed.png',
            iconSize: [38, 38],
            iconAnchor: [19, 37],
            popupAnchor: [-3, -36],
        }),
        clickedOnMarker: jest.fn(),
    };

    it('should render the Marker with the correct props', () => {
        render(<CustomMarker {...mockProps} />);

        const marker = screen.getByTestId('marker');

        expect(marker).toBeInTheDocument();
        expect(marker).toHaveAttribute(
            'data-position',
            convertLocationArrayToString(mockProps.location)
        );
        expect(marker).toHaveAttribute(
            'data-icon',
            mockProps.customIcon.options.iconUrl
        );
    });

    it('should call clickedOnMarker when Marker is clicked', () => {
        render(<CustomMarker {...mockProps} />);

        const marker = screen.getByTestId('marker');
        fireEvent.click(marker);

        expect(mockProps.clickedOnMarker).toHaveBeenCalledTimes(1);
    });
});
