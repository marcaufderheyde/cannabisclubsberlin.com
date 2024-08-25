import React from 'react';
import { render, screen } from '@testing-library/react';
import SwipeableDeck from './SwipeableDeck';

// Mock the useWindowSize hook
jest.mock('../../helpers/useWindowSize', () => ({
    __esModule: true,
    default: jest.fn(() => ({ width: 1024, height: 768 })),
}));

describe('SwipeableDeck', () => {
    const mockItems = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
    ];

    const MockCard = ({
        club,
        startPosition,
        startScale,
        zHeight,
        canSwipe,
    }: any) => (
        <div
            data-testid={`card-${club.id}`}
            style={{
                transform: `translate(${startPosition.x}px, ${startPosition.y}px) scale(${startScale})`,
                zIndex: zHeight,
            }}
        >
            {club.name} - {canSwipe ? 'Swipeable' : 'Not Swipeable'}
        </div>
    );

    const mockOnDownSwipeClose = jest.fn();
    const mockOnRightSwipe = jest.fn();
    const mockOnLeftSwipe = jest.fn();

    const renderComponent = (props = {}) => {
        return render(
            <SwipeableDeck
                items={mockItems}
                Card={MockCard}
                currentIndex={2}
                onDownSwipeClose={mockOnDownSwipeClose}
                onRightSwipe={mockOnRightSwipe}
                onLeftSwipe={mockOnLeftSwipe}
                {...props}
            />
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of cards', () => {
        renderComponent();
        const cards = screen.getAllByTestId(/card-/);
        expect(cards).toHaveLength(5);
    });

    it('applies correct styling to the current card', () => {
        renderComponent();
        const currentCard = screen.getByTestId('card-3');
        expect(currentCard).toHaveStyle(
            'transform: translate(387px, 200px) scale(1)'
        );
        expect(currentCard).toHaveStyle('z-index: 1');
        expect(currentCard).toHaveTextContent('Item 3 - Swipeable');
    });

    it('applies correct styling to other cards', () => {
        renderComponent();
        const otherCard = screen.getByTestId('card-2');
        expect(otherCard).toHaveStyle(
            'transform: translate(137px, 200px) scale(0.6)'
        );
        // Check for z-index: 1 for other cards
        expect(otherCard).toHaveStyle('z-index: 1');
        expect(otherCard).toHaveTextContent('Item 2 - Not Swipeable');
    });

    it('updates card positions when currentIndex changes', () => {
        const { rerender } = renderComponent();

        rerender(
            <SwipeableDeck
                items={mockItems}
                Card={MockCard}
                currentIndex={3}
                onDownSwipeClose={mockOnDownSwipeClose}
                onRightSwipe={mockOnRightSwipe}
                onLeftSwipe={mockOnLeftSwipe}
            />
        );

        const newCurrentCard = screen.getByTestId('card-4');
        expect(newCurrentCard).toHaveStyle(
            'transform: translate(387px, 200px) scale(1)'
        );
        expect(newCurrentCard).toHaveStyle('z-index: 1');
        expect(newCurrentCard).toHaveTextContent('Item 4 - Swipeable');
    });

    it('wraps around to the beginning when reaching the end of the list', () => {
        renderComponent({ currentIndex: 4 });
        const lastCard = screen.getByTestId('card-5');
        expect(lastCard).toHaveStyle(
            'transform: translate(387px, 200px) scale(1)'
        );
        expect(lastCard).toHaveStyle('z-index: 1');
        expect(lastCard).toHaveTextContent('Item 5 - Swipeable');

        const firstCard = screen.getByTestId('card-1');
        expect(firstCard).toHaveStyle(
            'transform: translate(637px, 200px) scale(0.6)'
        );
    });
});
