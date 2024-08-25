import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapListFilterSwitcher from './MapListFilterSwitcher';
import { useTranslations, useLocale } from 'next-intl';

jest.mock('next-intl', () => ({
    useTranslations: jest.fn(),
    useLocale: jest.fn(),
}));

describe('MapListFilterSwitcher', () => {
    const setShowHRFilterMock = jest.fn();

    beforeEach(() => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (useTranslations as jest.Mock).mockReturnValue((key: string) => {
            const translations: { [key: string]: string } = {
                clubs_menu_show_hr_clubs: 'Harm Reduction Clubs',
                clubs_menu_show_all_clubs: 'All Clubs',
            };
            return translations[key];
        });
    });

    it('renders correctly with "Harm Reduction Clubs" and "All Clubs" buttons', () => {
        render(
            <MapListFilterSwitcher
                showHRFilter={false}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        expect(
            screen.getByLabelText('show hr clubs button')
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText('show all clubs button')
        ).toBeInTheDocument();
    });

    it('triggers setShowHRFilter with "true" when "Harm Reduction Clubs" button is clicked', () => {
        render(
            <MapListFilterSwitcher
                showHRFilter={false}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        fireEvent.click(screen.getByLabelText('show hr clubs button'));
        expect(setShowHRFilterMock).toHaveBeenCalledWith(true);
    });

    it('triggers setShowHRFilter with "false" when "All Clubs" button is clicked', () => {
        render(
            <MapListFilterSwitcher
                showHRFilter={true}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        fireEvent.click(screen.getByLabelText('show all clubs button'));
        expect(setShowHRFilterMock).toHaveBeenCalledWith(false);
    });

    it('applies the correct background styles based on the showHRFilter prop', () => {
        const { rerender } = render(
            <MapListFilterSwitcher
                showHRFilter={true}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        // Verify that "Harm Reduction Clubs" has the active background and "All Clubs" is inactive
        expect(screen.getByLabelText('show hr clubs button')).toHaveClass(
            'bg-white text-black'
        );
        expect(screen.getByLabelText('show all clubs button')).toHaveClass(
            'bg-gray-100 text-neutral-400'
        );

        // Re-render with showHRFilter set to false
        rerender(
            <MapListFilterSwitcher
                showHRFilter={false}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        // Verify that "All Clubs" has the active background and "Harm Reduction Clubs" is inactive
        expect(screen.getByLabelText('show hr clubs button')).toHaveClass(
            'bg-gray-100 text-neutral-400'
        );
        expect(screen.getByLabelText('show all clubs button')).toHaveClass(
            'bg-white text-black'
        );
    });
});
