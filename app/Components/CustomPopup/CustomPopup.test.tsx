import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomPopup from './CustomPopup';

jest.mock('next-intl', () => ({
    useLocale: () => 'en',
}));

describe('CustomPopup Component', () => {
    const mockClub = {
        name: 'Test Club',
        slug: 'test-club',
        imageUrl: '/test-image.jpg',
        geoLocation: [52.52, 13.405],
        description: 'Test description',
        offerings: ['Test offerings'],
        harm_reduction: '',
        hasHRInformation: true,
    };

    const mockProps = {
        club: mockClub,
        clubs: [
            mockClub,
            { ...mockClub, name: 'Another Club', slug: 'another-club' },
        ],
        clubIndex: 1,
        onClose: jest.fn(),
        switchNextClub: jest.fn(),
        switchPreviousClub: jest.fn(),
        clubListExpanded: false,
    };

    it('should render the club details correctly', () => {
        render(<CustomPopup {...mockProps} />);

        expect(screen.getByText(mockClub.name)).toBeInTheDocument();

        expect(screen.getByText(mockClub.offerings[0])).toBeInTheDocument();
        expect(
            screen.getByAltText(`${mockClub.name} Club Picture`)
        ).toBeInTheDocument();
        expect(screen.getByText('2/2')).toBeInTheDocument();
    });

    it('should call onClose when the close button is clicked', () => {
        render(<CustomPopup {...mockProps} />);

        const closeButton = screen.getByTestId('close-svg');
        fireEvent.click(closeButton);

        expect(mockProps.onClose).toHaveBeenCalled();
    });

    it('should call switchNextClub when the next arrow button is clicked', () => {
        render(<CustomPopup {...mockProps} />);

        const nextButton = screen.getAllByTestId('triangle-svg')[1];
        fireEvent.click(nextButton);

        expect(mockProps.switchNextClub).toHaveBeenCalled();
    });

    it('should call switchPreviousClub when the previous arrow button is clicked', () => {
        render(<CustomPopup {...mockProps} />);

        const previousButton = screen.getAllByTestId('triangle-svg')[0];
        fireEvent.click(previousButton);

        expect(mockProps.switchPreviousClub).toHaveBeenCalled();
    });
});
