import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileNav from './MobileNav';
import { LinkInfo } from '../Navbar/Links';

jest.mock('@/app/Components/MobileNav/Hamburgerbutton', () => {
    const React = require('react');
    const MockHamburgerButton = ({
        showOverlay,
    }: {
        showOverlay: () => void;
    }) => {
        return React.createElement('div', {
            'data-testid': 'hamburger-button',
            onClick: showOverlay,
        });
    };
    MockHamburgerButton.displayName = 'MockHamburgerButton';
    return MockHamburgerButton;
});

jest.mock('@/app/Components/OverlayNav/Overlaynav', () => {
    const React = require('react');
    const MockOverlayNav = ({ closeOverlay }: { closeOverlay: () => void }) => {
        return React.createElement('div', {
            'data-testid': 'overlay-nav',
            onClick: closeOverlay,
        });
    };
    MockOverlayNav.displayName = 'MockOverlayNav';
    return MockOverlayNav;
});

describe('MobileNav Component', () => {
    const mockLinks: Array<LinkInfo> = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
    ];

    it('renders the HamburgerButton initially', () => {
        render(<MobileNav links={mockLinks} />);
        const hamburgerButton = screen.getByTestId('hamburger-button');
        expect(hamburgerButton).toBeInTheDocument();
    });

    it('renders the OverlayNav when HamburgerButton is clicked', () => {
        render(<MobileNav links={mockLinks} />);
        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);

        const overlayNav = screen.getByTestId('overlay-nav');
        expect(overlayNav).toBeInTheDocument();
    });

    it('renders HamburgerButton again when OverlayNav is closed', () => {
        render(<MobileNav links={mockLinks} />);
        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);

        const overlayNav = screen.getByTestId('overlay-nav');
        fireEvent.click(overlayNav);

        const hamburgerButtonAgain = screen.getByTestId('hamburger-button');
        expect(hamburgerButtonAgain).toBeInTheDocument();
    });
});
