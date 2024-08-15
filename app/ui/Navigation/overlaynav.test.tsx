import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OverlayNav from './overlaynav';
import { usePathname } from 'next/navigation';
import { LinkInfo } from './links';
import usePrevious from '@/app/Helpers/usePrevious';
import usePreventScrolling from '@/app/Helpers/usePreventScrolling';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('@/app/Helpers/usePrevious', () => jest.fn());
jest.mock('@/app/Helpers/usePreventScrolling', () => jest.fn());

jest.mock('@/app/ui/Navigation/logo', () => ({
    __esModule: true,
    default: function MockLogo({ onClick }: { onClick: () => void }) {
        const React = require('react');
        return React.createElement('div', {
            'data-testid': 'logo',
            onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                onClick();
            },
        });
    },
}));

jest.mock('@/app/ui/Navigation/close', () => ({
    __esModule: true,
    default: function MockClose({ color }: { color: string }) {
        const React = require('react');
        return React.createElement('div', {
            'data-testid': 'close-svg',
            style: { color },
            onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
            },
        });
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

describe('OverlayNav Component', () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/current-path');
        (usePrevious as jest.Mock).mockReturnValue('/previous-path');
    });

    it('renders the overlay with logo, close button, and links', () => {
        const mockLinks: LinkInfo[] = [
            { name: 'Link 1', href: '/link1' },
            { name: 'Link 2', href: '/link2' },
        ];
        const mockCloseOverlay = jest.fn();

        render(
            <OverlayNav closeOverlay={mockCloseOverlay} links={mockLinks} />
        );

        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('close-svg')).toBeInTheDocument();
        expect(screen.getByTestId('translation-switch')).toBeInTheDocument();

        mockLinks.forEach((link) => {
            expect(screen.getByText(link.name as string)).toBeInTheDocument();
        });
    });

    it('triggers closeOverlay when the close button is clicked', () => {
        const mockCloseOverlay = jest.fn();
        render(<OverlayNav closeOverlay={mockCloseOverlay} links={[]} />);

        fireEvent.click(screen.getByTestId('close-button'));
        expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
    });

    it('triggers closeOverlay when a link is clicked', () => {
        const mockCloseOverlay = jest.fn();
        const mockLinks: LinkInfo[] = [{ name: 'Link 1', href: '/link1' }];

        render(
            <OverlayNav closeOverlay={mockCloseOverlay} links={mockLinks} />
        );

        fireEvent.click(screen.getByText('Link 1'));
        expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
    });

    it('does not trigger closeOverlay when clicking a link that points to the current path', () => {
        const mockCloseOverlay = jest.fn();
        const mockLinks: LinkInfo[] = [
            { name: 'Current Path', href: '/current-path' },
        ];

        (usePathname as jest.Mock).mockReturnValue('/current-path');

        render(
            <OverlayNav closeOverlay={mockCloseOverlay} links={mockLinks} />
        );

        fireEvent.click(screen.getByText('Current Path'));
        expect(mockCloseOverlay).not.toHaveBeenCalled();
    });

    it('triggers closeOverlay when the pathname changes', () => {
        const mockCloseOverlay = jest.fn();
        const mockLinks: LinkInfo[] = [{ name: 'Link 1', href: '/link1' }];

        (usePathname as jest.Mock).mockReturnValue('/new-path');

        render(
            <OverlayNav closeOverlay={mockCloseOverlay} links={mockLinks} />
        );

        expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
    });
});
