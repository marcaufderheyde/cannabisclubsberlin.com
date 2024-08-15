import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { LinkInfo } from './links';
import isPathNameHome from '@/app/Helpers/isPathnameHome';

// Mock the necessary hooks and components
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
    useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock('@/app/Helpers/isPathnameHome', () => jest.fn());

jest.mock('@/app/ui/Navigation/logo', () => ({
    __esModule: true,
    default: function MockLogo() {
        const React = require('react');
        return React.createElement('div', { 'data-testid': 'logo' });
    },
}));

jest.mock('@/app/ui/Navigation/translation-switch', () => ({
    __esModule: true,
    default: function MockTranslationSwitch() {
        const React = require('react');
        return React.createElement('div', {
            'data-testid': 'translation-switch',
        });
    },
}));

jest.mock('@/app/ui/Navigation/mobilenav', () => ({
    __esModule: true,
    default: function MockMobileNav({ links }: { links: Array<LinkInfo> }) {
        const React = require('react');
        return React.createElement(
            'div',
            { 'data-testid': 'mobile-nav' },
            links.map((link) =>
                React.createElement('span', { key: link.name }, link.name)
            )
        );
    },
}));

jest.mock('@/app/ui/Navigation/links', () => ({
    __esModule: true,
    default: function MockLinks({ links }: { links: Array<LinkInfo> }) {
        const React = require('react');
        return React.createElement(
            'div',
            { 'data-testid': 'links' },
            links.map((link) =>
                React.createElement('span', { key: link.name }, link.name)
            )
        );
    },
}));

describe('Navbar Component', () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/home');
        (useLocale as jest.Mock).mockReturnValue('en');
        (isPathNameHome as jest.Mock).mockReturnValue(true);
    });

    it('renders Navbar with correct styles and components when on home page', () => {
        render(<Navbar isOnMap={false} />);

        const logoElement = screen.getByTestId('logo');
        const linksElement = screen.getByTestId('links');
        const translationSwitchElement =
            screen.getByTestId('translation-switch');
        const mobileNavElement = screen.getByTestId('mobile-nav');

        expect(logoElement).toBeInTheDocument();
        expect(linksElement).toBeInTheDocument();
        expect(translationSwitchElement).toBeInTheDocument();
        expect(mobileNavElement).toBeInTheDocument();

        // Use getAllByText to find all occurrences of each link text
        const linkTexts = [
            'clubs_title',
            'harm_reduction_title',
            'law_title',
            'contact_title',
            'about_title',
        ];
        linkTexts.forEach((text) => {
            const elements = screen.getAllByText(text);
            expect(elements.length).toBeGreaterThan(0);
        });

        const navbarElement = screen.getByRole('banner');
        expect(navbarElement).toHaveClass('text-white');
        expect(navbarElement).not.toHaveClass('bg-white bg-opacity-85');
    });

    it('applies correct styles when isOnMap is true', () => {
        render(<Navbar isOnMap={true} />);

        const navbarElement = screen.getByRole('banner');
        expect(navbarElement).toHaveClass('z-[3000] bg-white bg-opacity-85');
    });

    it('applies correct styles when not on home page', () => {
        (isPathNameHome as jest.Mock).mockReturnValue(false);
        render(<Navbar isOnMap={false} />);

        const navbarElement = screen.getByRole('banner');
        expect(navbarElement).toHaveClass('text-[#868686]');
    });
});
