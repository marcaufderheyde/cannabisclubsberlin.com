import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import OverlayNav from './Overlaynav';
import { usePathname } from 'next/navigation';
import { LinkInfo } from '@/app/components/Navbar/Links';
import usePrevious from '@/app/components/OverlayNav/helpers/usePrevious';

jest.mock('@/app/components/Drawer/Drawer', () => ({
    __esModule: true,
    default: ({
        children,
        isOpen,
        onClose,
        className,
    }: {
        children: React.ReactElement;
        isOpen: boolean;
        onClose: () => void;
        className?: string;
    }) => {
        const React = require('react');

        if (!isOpen) {
            return null;
        }

        return React.createElement(
            'div',
            { 'data-testid': 'mocked-drawer', className: className },
            React.createElement(
                'div',
                { 'data-testid': 'close-button', onClick: onClose },
                'Close'
            ),
            React.createElement(
                'div',
                { 'data-testid': 'mocked-drawer-content' },
                children
            )
        );
    },
}));

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
        let mockShowOverlay = true;
        const mockCloseOverlay = jest.fn(() => (mockShowOverlay = false));

        render(
            <OverlayNav
                showOverlay={mockShowOverlay}
                closeOverlay={mockCloseOverlay}
                links={mockLinks}
            />
        );

        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('close-button')).toBeInTheDocument();
        expect(screen.getByTestId('translation-switch')).toBeInTheDocument();

        mockLinks.forEach((link) => {
            expect(screen.getByText(link.name as string)).toBeInTheDocument();
        });
    });

    it('calls closeOverlay when the close button is clicked', () => {
        let mockShowOverlay = true;
        const mockCloseOverlay = jest.fn();
        render(
            <OverlayNav
                showOverlay={mockShowOverlay}
                closeOverlay={mockCloseOverlay}
                links={[]}
            />
        );

        act(() => {
            fireEvent.click(screen.getByTestId('close-button'));
        });

        expect(mockCloseOverlay).toHaveBeenCalledTimes(2);
    });

    it('calls closeOverlay when a link to a different path is clicked', () => {
        let mockShowOverlay = true;
        const mockCloseOverlay = jest.fn(() => (mockShowOverlay = false));
        const mockLinks: LinkInfo[] = [{ name: 'Link 1', href: '/link1' }];

        render(
            <OverlayNav
                showOverlay={mockShowOverlay}
                closeOverlay={mockCloseOverlay}
                links={mockLinks}
            />
        );

        act(() => {
            fireEvent.click(screen.getByText('Link 1'));
        });

        expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
    });

    it('does not call closeOverlay when clicking a link that points to the current path', () => {
        (usePrevious as jest.Mock).mockReturnValue('/current-path');

        let mockShowOverlay = true;
        const mockCloseOverlay = jest.fn(() => (mockShowOverlay = false));
        const mockLinks: LinkInfo[] = [
            { name: 'Current Path', href: '/current-path' },
        ];

        render(
            <OverlayNav
                showOverlay={mockShowOverlay}
                closeOverlay={mockCloseOverlay}
                links={mockLinks}
            />
        );

        act(() => {
            fireEvent.click(screen.getByText('Current Path'));
        });

        expect(mockCloseOverlay).not.toHaveBeenCalled();
    });

    it('triggers closeOverlay when the pathname changes', () => {
        let mockShowOverlay = true;
        const mockCloseOverlay = jest.fn(() => (mockShowOverlay = false));
        (usePathname as jest.Mock).mockReturnValueOnce('/current-path');

        const { rerender } = render(
            <OverlayNav
                showOverlay={mockShowOverlay}
                closeOverlay={mockCloseOverlay}
                links={[]}
            />
        );

        (usePathname as jest.Mock).mockReturnValueOnce('/new-path');

        rerender(
            <OverlayNav
                showOverlay={mockShowOverlay}
                closeOverlay={mockCloseOverlay}
                links={[]}
            />
        );

        expect(mockCloseOverlay).toHaveBeenCalledTimes(2);
    });
});
