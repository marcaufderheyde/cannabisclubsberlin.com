import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HamburgerButton from './Hamburgerbutton';
import { usePathname } from 'next/navigation';
import isPathnameHome from '@/app/helpers/isPathnameHome';

jest.mock('@/app/components/Burger/Burger', () => {
    const React = require('react');
    const MockBurger = ({ color }: { color: string }) => {
        return React.createElement('div', {
            'data-testid': 'burger-svg',
            style: { color },
        });
    };
    MockBurger.displayName = 'MockBurger';
    return MockBurger;
});

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('@/app/helpers/isPathnameHome', () => jest.fn());

describe('HamburgerButton Component', () => {
    it('renders Burger with the correct color when pathname is home', () => {
        (usePathname as jest.Mock).mockReturnValue('/home');
        (isPathnameHome as jest.Mock).mockReturnValue(true);

        render(<HamburgerButton showOverlay={() => {}} />);

        const burgerElement = screen.getByTestId('burger-svg');
        expect(burgerElement).toBeInTheDocument();
        expect(burgerElement).toHaveStyle('color: white');
    });

    it('renders Burger with the correct color when pathname is not home', () => {
        (usePathname as jest.Mock).mockReturnValue('/about');
        (isPathnameHome as jest.Mock).mockReturnValue(false);

        render(<HamburgerButton showOverlay={() => {}} />);

        const burgerElement = screen.getByTestId('burger-svg');
        expect(burgerElement).toBeInTheDocument();
        expect(burgerElement).toHaveStyle('color: rgba(182,207,84,1)');
    });

    it('calls showOverlay when the button is clicked', () => {
        const mockShowOverlay = jest.fn();
        render(<HamburgerButton showOverlay={mockShowOverlay} />);

        const buttonElement = screen.getByLabelText('hamburger button');
        fireEvent.click(buttonElement);

        expect(mockShowOverlay).toHaveBeenCalledTimes(1);
    });
});
