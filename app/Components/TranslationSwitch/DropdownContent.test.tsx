import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownContent from './DropdownContent';
import { useLocale } from 'next-intl';

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
}));

describe('DropdownContent Component', () => {
    const mockProps = {
        handleClickAndChangeLanguage: jest.fn(),
        dropdownRef: React.createRef<HTMLDivElement>(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the German flag and "DEU" when the active locale is "en"', () => {
        (useLocale as jest.Mock).mockReturnValue('en');

        render(<DropdownContent {...mockProps} />);

        expect(screen.getByLabelText('german flag')).toBeInTheDocument();
        expect(screen.getByText('DEU')).toBeInTheDocument();
    });

    it('should render the English flag and "ENG" when the active locale is "de"', () => {
        (useLocale as jest.Mock).mockReturnValue('de');

        render(<DropdownContent {...mockProps} />);

        expect(screen.getByLabelText('english flag')).toBeInTheDocument();
        expect(screen.getByText('ENG')).toBeInTheDocument();
    });

    it('should call handleClickAndChangeLanguage with "de" when the active locale is "en"', () => {
        (useLocale as jest.Mock).mockReturnValue('en');
        render(<DropdownContent {...mockProps} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockProps.handleClickAndChangeLanguage).toHaveBeenCalledWith(
            'de'
        );
    });

    it('should call handleClickAndChangeLanguage with "en" when the active locale is "de"', () => {
        (useLocale as jest.Mock).mockReturnValue('de');

        render(<DropdownContent {...mockProps} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockProps.handleClickAndChangeLanguage).toHaveBeenCalledWith(
            'en'
        );
    });
});
