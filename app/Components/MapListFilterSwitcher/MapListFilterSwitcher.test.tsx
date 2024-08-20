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
        (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
        (useLocale as jest.Mock).mockReturnValue('en');
    });

    it('renders correctly with "Harm Reduction Clubs" and "All Clubs" buttons', () => {
        render(
            <MapListFilterSwitcher
                showHRFilter={false}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        expect(screen.getByText('Harm Reduction Clubs')).toBeInTheDocument();
        expect(screen.getByText('All Clubs')).toBeInTheDocument();
    });

    it('triggers setShowHRFilter with "true" when "Harm Reduction Clubs" button is clicked', () => {
        render(
            <MapListFilterSwitcher
                showHRFilter={false}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        fireEvent.click(screen.getByText('Harm Reduction Clubs'));
        expect(setShowHRFilterMock).toHaveBeenCalledWith(true);
    });

    it('triggers setShowHRFilter with "false" when "All Clubs" button is clicked', () => {
        render(
            <MapListFilterSwitcher
                showHRFilter={true}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        fireEvent.click(screen.getByText('All Clubs'));
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
        expect(
            screen.getByText('Harm Reduction Clubs').parentElement
        ).toHaveClass('bg-white text-black');
        expect(screen.getByText('All Clubs').parentElement).toHaveClass(
            'bg-gray-200 text-neutral-400'
        );

        // Re-render with showHRFilter set to false
        rerender(
            <MapListFilterSwitcher
                showHRFilter={false}
                setShowHRFilter={setShowHRFilterMock}
            />
        );

        // Verify that "All Clubs" has the active background and "Harm Reduction Clubs" is inactive
        expect(
            screen.getByText('Harm Reduction Clubs').parentElement
        ).toHaveClass('bg-gray-200 text-neutral-400');
        expect(screen.getByText('All Clubs').parentElement).toHaveClass(
            'bg-white text-black'
        );
    });
});
