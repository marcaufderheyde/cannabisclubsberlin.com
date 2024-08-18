import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import OverlayNav from './Overlaynav';
import { usePathname } from 'next/navigation';
import { LinkInfo } from '../Navbar/Links';
import usePrevious from '@/app/components/OverlayNav/helpers/usePrevious';
import usePreventScrolling from '@/app/components/OverlayNav/helpers/usePreventScrolling';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('@/app/components/OverlayNav/helpers/usePrevious', () => jest.fn());
jest.mock('@/app/components/OverlayNav/helpers/usePreventScrolling', () =>
    jest.fn()
);

jest.mock('@/app/components/Logo/Logo', () => ({
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

jest.mock('@/app/components/Close/Close', () => ({
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

jest.mock('../TranslationSwitch/TranslationSwitch', () => ({
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

    it('calls closeOverlay when the close button is clicked', () => {
        const mockCloseOverlay = jest.fn();
        render(<OverlayNav closeOverlay={mockCloseOverlay} links={[]} />);

        act(() => {
            fireEvent.click(screen.getByTestId('close-button'));
        });

        expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
    });

    it('calls closeOverlay when a link to a different path is clicked', () => {
        const mockCloseOverlay = jest.fn();
        const mockLinks: LinkInfo[] = [{ name: 'Link 1', href: '/link1' }];

        render(
            <OverlayNav closeOverlay={mockCloseOverlay} links={mockLinks} />
        );

        act(() => {
            fireEvent.click(screen.getByText('Link 1'));
        });

        expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
    });

    it('does not call closeOverlay when clicking a link that points to the current path', () => {
        (usePrevious as jest.Mock).mockReturnValue('/current-path');

        const mockCloseOverlay = jest.fn();
        const mockLinks: LinkInfo[] = [
            { name: 'Current Path', href: '/current-path' },
        ];

        render(
            <OverlayNav closeOverlay={mockCloseOverlay} links={mockLinks} />
        );

        act(() => {
            fireEvent.click(screen.getByText('Current Path'));
        });

        expect(mockCloseOverlay).not.toHaveBeenCalled();
    });

    it('triggers closeOverlay when the pathname changes', () => {
        const mockCloseOverlay = jest.fn();
        (usePathname as jest.Mock).mockReturnValueOnce('/current-path');

        const { rerender } = render(
            <OverlayNav closeOverlay={mockCloseOverlay} links={[]} />
        );

        (usePathname as jest.Mock).mockReturnValueOnce('/new-path');

        rerender(<OverlayNav closeOverlay={mockCloseOverlay} links={[]} />);

        expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
    });
});
