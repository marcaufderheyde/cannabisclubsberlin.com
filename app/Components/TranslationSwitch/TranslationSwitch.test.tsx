import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocalSwitcher from '@/app/Components/TranslationSwitch/TranslationSwitch';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
}));

jest.mock('@/app/Components/TranslationSwitch/DropdownTrigger', () => ({
    __esModule: true,
    default: function MockDropdownTrigger({
        dropdownRef,
        handleClick,
        toggleCaret,
    }: {
        dropdownRef: React.RefObject<HTMLDivElement>;
        handleClick: () => void;
        toggleCaret: (toggle: () => void) => void;
    }) {
        const React = require('react');
        return React.createElement('div', {
            'data-testid': 'dropdown-trigger',
            onClick: handleClick,
        });
    },
}));

jest.mock('@/app/Components/TranslationSwitch/DropdownContent', () => ({
    __esModule: true,
    default: function MockDropdownContent({
        dropdownRef,
        handleClickAndChangeLanguage,
    }: {
        dropdownRef: React.RefObject<HTMLDivElement>;
        handleClickAndChangeLanguage: (nextLocale: string) => void;
    }) {
        const React = require('react');
        return React.createElement('div', {
            'data-testid': 'dropdown-content',
            onClick: () => handleClickAndChangeLanguage('de'),
        });
    },
}));

describe('LocalSwitcher Component', () => {
    const mockRouterReplace = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            replace: mockRouterReplace,
        });
        (usePathname as jest.Mock).mockReturnValue('/current-path');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        (useLocale as jest.Mock).mockReturnValue('en');
    });

    it('renders correctly with the default locale', () => {
        render(<LocalSwitcher />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveValue('en');
    });

    it('changes the locale on mobile when a different option is selected', () => {
        render(<LocalSwitcher />);

        const selectElement = screen.getByRole('combobox');
        fireEvent.change(selectElement, { target: { value: 'de' } });

        expect(mockRouterReplace).toHaveBeenCalledWith('/de');
    });

    it('toggles the dropdown content visibility on desktop', () => {
        render(<LocalSwitcher />);

        const triggerElement = screen.getByTestId('dropdown-trigger');
        expect(
            screen.queryByTestId('dropdown-content')
        ).not.toBeInTheDocument();

        // Open the dropdown
        fireEvent.click(triggerElement);
        expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();

        // Close the dropdown
        fireEvent.click(triggerElement);
        expect(
            screen.queryByTestId('dropdown-content')
        ).not.toBeInTheDocument();
    });

    it('changes the locale on desktop when a language is selected from the dropdown', () => {
        render(<LocalSwitcher />);

        const triggerElement = screen.getByTestId('dropdown-trigger');
        fireEvent.click(triggerElement);

        const dropdownContent = screen.getByTestId('dropdown-content');
        fireEvent.click(dropdownContent);

        expect(mockRouterReplace).toHaveBeenCalledWith('/de');
    });
});
