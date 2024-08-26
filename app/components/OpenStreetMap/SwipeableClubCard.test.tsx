import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SwipeableClubCard from './SwipeableClubCard';
import { Club } from '../../helpers/clubsListContent';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock the next-intl module
jest.mock('next-intl', () => ({
    useLocale: jest.fn(() => 'en'),
}));

jest.mock('next/image', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: ({ src, alt }: { src: string; alt: string }) =>
            React.createElement('img', { 'data-testid': 'image', src, alt }),
    };
});

describe('SwipeableClubCard', () => {
    const mockClub: Club = {
        name: 'Test Club',
        slug: 'test-club',
        imageUrl: '/test-image.jpg',
        offerings: 'Offer 1, Offer 2',
        key: '',
        prices: '',
        location: '',
        description: '',
        harm_reduction: '',
        hasHRInformation: false,
        clubPageUrl: '',
        geoLocation: [],
        address: '',
        reviews: '',
    };

    const mockStartPosition = { x: 0, y: 0 };
    const mockStartScale = 1;
    const mockZHeight = 10;

    const mockOnDownSwipeClose = jest.fn();
    const mockOnRightSwipe = jest.fn();
    const mockOnLeftSwipe = jest.fn();

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const renderComponent = (props = {}) => {
        return render(
            <SwipeableClubCard
                club={mockClub}
                index={0}
                startPosition={mockStartPosition}
                startScale={mockStartScale}
                zHeight={mockZHeight}
                canSwipe={true}
                onDownSwipeClose={mockOnDownSwipeClose}
                onRightSwipe={mockOnRightSwipe}
                onLeftSwipe={mockOnLeftSwipe}
                {...props}
            />
        );
    };

    const simulateSwipe = (
        element: HTMLElement,
        start: [number, number],
        end: [number, number]
    ) => {
        fireEvent.touchStart(element, {
            changedTouches: [{ pageX: start[0], pageY: start[1] }],
        });
        fireEvent.touchMove(element, {
            changedTouches: [{ pageX: end[0], pageY: end[1] }],
        });
        fireEvent.touchEnd(element, {
            changedTouches: [{ pageX: end[0], pageY: end[1] }],
        });
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the club card with correct information', () => {
        renderComponent();
        expect(screen.getByText('Test Club')).toBeInTheDocument();
        expect(
            screen.getByAltText('Test Club Club Picture')
        ).toBeInTheDocument();
    });

    it('navigates to club page when clicking anywhere on the card content', () => {
        renderComponent();
        const cardContentElement = screen.getByText('Test Club').closest('div');
        if (!cardContentElement)
            throw new Error('Card content element not found');
        fireEvent.click(cardContentElement);
        expect(mockPush).toHaveBeenCalledWith('/en/clubs/test-club');
    });

    it('applies correct styling based on props', () => {
        renderComponent();
        const cardElement = screen.getByLabelText('swipeable card');
        expect(cardElement).toHaveStyle(`
            transform: translate(0px, 0px) scale(1);
            transition: transform 0.2s;
            z-index: 10;
        `);
    });

    it('does not allow swiping when canSwipe is false', () => {
        const mockOnRightSwipe = jest.fn();
        renderComponent({ canSwipe: false, onRightSwipe: mockOnRightSwipe });
        const swipeableElement = screen.getByText('Test Club').closest('div');
        if (swipeableElement) {
            simulateSwipe(swipeableElement, [0, 0], [100, 0]);
        }
        expect(mockOnRightSwipe).not.toHaveBeenCalled();
    });

    it('handles horizontal swipe', () => {
        renderComponent();
        const swipeableElement = screen.getByText('Test Club').closest('div');
        if (swipeableElement) {
            simulateSwipe(swipeableElement, [0, 0], [100, 0]);
        }
        expect(mockOnRightSwipe).toHaveBeenCalled();
    });

    it('handles vertical swipe', () => {
        renderComponent();
        const swipeableElement = screen.getByText('Test Club').closest('div');
        if (swipeableElement) {
            simulateSwipe(swipeableElement, [0, 0], [0, 200]);
        }
        expect(mockOnDownSwipeClose).toHaveBeenCalled();
    });

    it('renders offering tags correctly', () => {
        renderComponent();
        expect(screen.getByText('Offer 1')).toBeInTheDocument();
        expect(screen.getByText('Offer 2')).toBeInTheDocument();
    });

    it('applies correct styling to offering tags', () => {
        renderComponent();
        const offerTags = screen.getAllByText(/Offer/);
        offerTags.forEach((tag) => {
            expect(tag).toHaveClass(
                'bg-blue-100',
                'text-blue-800',
                'text-xs',
                'font-medium',
                'me-2',
                'p-0.5',
                'inline-block',
                'overflow-hidden',
                'text-center',
                'rounded',
                'dark:bg-gray-700',
                'dark:text-blue-400',
                'border',
                'border-blue-400'
            );
        });
    });

    it('renders correct number of offering tags', () => {
        const clubWithMoreOfferings = {
            ...mockClub,
            offerings: 'Offer 1, Offer 2, Offer 3, Offer 4',
        };
        renderComponent({ club: clubWithMoreOfferings });
        const offerTags = screen.getAllByText(/Offer/);
        expect(offerTags).toHaveLength(4);
    });

    it('handles empty offerings gracefully', () => {
        const clubWithNoOfferings = {
            ...mockClub,
            offerings: '',
        };
        renderComponent({ club: clubWithNoOfferings });
        const offerTags = screen.queryAllByText(/Offer/);
        expect(offerTags).toHaveLength(0);
    });
});
