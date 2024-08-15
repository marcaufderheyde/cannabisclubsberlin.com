import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileNav from './mobilenav';
import HamburgerButton from '@/app/ui/Navigation/hamburgerbutton';
import OverlayNav from '@/app/ui/Navigation/overlaynav';
import { LinkInfo } from './links';

// Mock HamburgerButton component
jest.mock('@/app/ui/Navigation/hamburgerbutton', () => {
    const React = require('react');
    return ({ showOverlay }: { showOverlay: () => void }) => {
        return React.createElement('div', {
            'data-testid': 'hamburger-button',
            onClick: showOverlay,
        });
    };
});

// Mock OverlayNav component
jest.mock('@/app/ui/Navigation/overlaynav', () => {
    const React = require('react');
    return ({ closeOverlay }: { closeOverlay: () => void }) => {
        return React.createElement('div', {
            'data-testid': 'overlay-nav',
            onClick: closeOverlay,
        });
    };
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
