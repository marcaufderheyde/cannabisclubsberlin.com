import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapListViewSwitcher from './MapListViewSwitcher';
import { useLocale, useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
    useTranslations: jest.fn(),
}));

describe('MapListViewSwitcher Component', () => {
    const mockSetShowMap = jest.fn();

    beforeEach(() => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (useTranslations as jest.Mock).mockReturnValue((key: string) => {
            const translations: { [key: string]: string } = {
                clubs_menu_show_map: 'Show Map',
                clubs_menu_show_list: 'Show List',
            };
            return translations[key];
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with the map button selected when showMap is true', () => {
        render(
            <MapListViewSwitcher showMap={true} setShowMap={mockSetShowMap} />
        );

        expect(screen.getByLabelText('show map')).toHaveClass('text-black');
        expect(screen.getByLabelText('show list')).toHaveClass(
            'text-neutral-400'
        );
    });

    it('should render with the list button selected when showMap is false', () => {
        render(
            <MapListViewSwitcher showMap={false} setShowMap={mockSetShowMap} />
        );

        expect(screen.getByLabelText('show list')).toHaveClass('text-black');
        expect(screen.getByLabelText('show map')).toHaveClass(
            'text-neutral-400'
        );
    });

    it('should call setShowMap with true when the map button is clicked', () => {
        render(
            <MapListViewSwitcher showMap={false} setShowMap={mockSetShowMap} />
        );

        const mapButton = screen.getByText('Show Map');
        fireEvent.click(mapButton);

        expect(mockSetShowMap).toHaveBeenCalledWith(true);
    });

    it('should call setShowMap with false when the list button is clicked', () => {
        render(
            <MapListViewSwitcher showMap={true} setShowMap={mockSetShowMap} />
        );

        const listButton = screen.getByText('Show List');
        fireEvent.click(listButton);

        expect(mockSetShowMap).toHaveBeenCalledWith(false);
    });
});
