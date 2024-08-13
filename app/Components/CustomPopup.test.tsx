import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomPopup from './CustomPopup';

// Mock the necessary dependencies
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
        offerings: 'Test offerings',
    };

    const mockProps = {
        club: mockClub,
        clubIndex: '1/10',
        onClose: jest.fn(),
        switchNextClub: jest.fn(),
        switchPreviousClub: jest.fn(),
    };

    it('should render the club details correctly', () => {
        render(<CustomPopup {...mockProps} />);

        expect(screen.getByText(mockClub.name)).toBeInTheDocument();
        expect(screen.getByText(mockClub.description)).toBeInTheDocument();
        expect(screen.getByText(mockClub.offerings)).toBeInTheDocument();
        expect(
            screen.getByAltText(`${mockClub.name} Club Picture`)
        ).toBeInTheDocument();
        expect(screen.getByText(mockProps.clubIndex)).toBeInTheDocument();
    });

    it('should call onClose when the close button is clicked', () => {
        render(<CustomPopup {...mockProps} />);

        const closeButton = screen.getByLabelText('close');
        fireEvent.click(closeButton);

        expect(mockProps.onClose).toHaveBeenCalled();
    });

    it('should call switchNextClub when the next arrow button is clicked', () => {
        render(<CustomPopup {...mockProps} />);

        const nextButton = screen.getByLabelText('next');
        fireEvent.click(nextButton);

        expect(mockProps.switchNextClub).toHaveBeenCalled();
    });

    it('should call switchPreviousClub when the previous arrow button is clicked', () => {
        render(<CustomPopup {...mockProps} />);

        const previousButton = screen.getByLabelText('previous');
        fireEvent.click(previousButton);

        expect(mockProps.switchPreviousClub).toHaveBeenCalled();
    });
});
