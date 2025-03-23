import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomPopup from './CustomPopup';
import { mock } from 'node:test';

// Mock next-intl
jest.mock('next-intl', () => ({
    useLocale: () => 'en',
}));

describe('CustomPopup Component', () => {
    // Test data setup
    const mockClub = {
        id: '1',
        name: 'Cannabis Club Berlin',
        slug: 'cannabis-club-berlin',
        imageUrl: '/images/test-club.jpg',
        address: 'Alexanderplatz 1, Berlin',
        clubPageUrl: 'https://example.com',
        geoLocation: [52.52, 13.405],
        description:
            'A premium cannabis social club in Berlin offering a variety of strains.',
        offerings: ['Premium Buds', 'Edibles', 'Concentrates'],
        harm_reduction: 'Information about safe consumption practices',
        hasHRInformation: true,
    };

    const mockProps = {
        club: mockClub,
        clubs: [
            mockClub,
            {
                ...mockClub,
                id: '2',
                name: 'Kreuzberg Cannabis Club',
                slug: 'kreuzberg-cannabis-club',
            },
            {
                ...mockClub,
                id: '3',
                name: 'Neukölln Cannabis Club',
                slug: 'neukolln-cannabis-club',
            },
        ],
        clubIndex: 1,
        onClose: jest.fn(),
        switchNextClub: jest.fn(),
        switchPreviousClub: jest.fn(),
        clubListExpanded: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the club name correctly', () => {
        render(<CustomPopup {...mockProps} />);
        expect(screen.getByText(mockClub.name)).toBeInTheDocument();
    });

    it('renders the club address correctly', () => {
        render(<CustomPopup {...mockProps} />);
        expect(screen.getByText(mockClub.address)).toBeInTheDocument();
    });

    it('displays the club image with proper alt text', () => {
        render(<CustomPopup {...mockProps} />);
        const image = screen.getByAltText(`${mockClub.name} Club Picture`);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src');
    });

    it('displays the Harm Reduction tag when hasHRInformation is true', () => {
        render(<CustomPopup {...mockProps} />);
        expect(screen.getByText('Harm Reduction')).toBeInTheDocument();
    });

    it('does not display the Harm Reduction tag when hasHRInformation is false', () => {
        const propsWithoutHR = {
            ...mockProps,
            club: { ...mockClub, hasHRInformation: false },
        };
        render(<CustomPopup {...propsWithoutHR} />);
        expect(screen.queryByText('Harm Reduction')).not.toBeInTheDocument();
    });

    it('shows the club offerings as tags', () => {
        render(<CustomPopup {...mockProps} />);
        mockClub.offerings.forEach((offering) => {
            expect(screen.getByText(offering)).toBeInTheDocument();
        });
    });

    it('calls onClose when the close button is clicked', () => {
        render(<CustomPopup {...mockProps} />);
        fireEvent.click(screen.getByTestId('close-svg'));
        expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('renders the website link correctly', () => {
        render(<CustomPopup {...mockProps} />);
        const websiteLink = screen.getByText('Website');
        expect(websiteLink).toBeInTheDocument();
        expect(websiteLink).toHaveAttribute('href', mockClub.clubPageUrl);
    });
});
