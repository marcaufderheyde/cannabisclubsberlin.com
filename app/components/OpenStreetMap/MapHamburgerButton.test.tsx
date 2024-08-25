import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapHamburgerButton from './MapHamburgerButton';

jest.mock('../Burger/Burger', () => {
    const React = require('react');
    return function MockBurger({ color }: { color: string }) {
        return React.createElement(
            'div',
            { 'data-testid': 'mock-burger', style: { color } },
            'Burger Icon'
        );
    };
});

describe('MapHamburgerButton', () => {
    const mockShowClubList = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<MapHamburgerButton showClubList={mockShowClubList} />);
        expect(screen.getByTestId('mock-burger')).toBeInTheDocument();
    });

    it('calls showClubList when clicked', () => {
        render(<MapHamburgerButton showClubList={mockShowClubList} />);
        const button = screen.getByTestId('mock-burger').parentElement!;
        fireEvent.click(button);
        expect(mockShowClubList).toHaveBeenCalledTimes(1);
    });

    it('renders with correct CSS classes', () => {
        render(<MapHamburgerButton showClubList={mockShowClubList} />);
        const buttonContainer =
            screen.getByTestId('mock-burger').parentElement!;
        expect(buttonContainer).toHaveClass(
            'absolute z-[2005] right-0 m-2 p-2 bg-[rgba(255,255,255,0.5)]'
        );
    });

    it('passes correct color prop to Burger component', () => {
        render(<MapHamburgerButton showClubList={mockShowClubList} />);
        const burgerComponent = screen.getByTestId('mock-burger');

        expect(burgerComponent).toHaveStyle('color: white');
    });
});
