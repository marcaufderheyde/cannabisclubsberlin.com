import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownTrigger from './DropdownTrigger';
import { useLocale } from 'next-intl';

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
}));

describe('DropdownTrigger Component', () => {
    const mockProps = {
        handleClick: jest.fn(),
        dropdownRef: React.createRef<HTMLButtonElement>(),
        toggleCaret: jest.fn(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the German flag and "DEU" when the active locale is "en"', () => {
        (useLocale as jest.Mock).mockReturnValue('en');

        render(<DropdownTrigger {...mockProps} />);

        expect(screen.getByLabelText('english flag')).toBeInTheDocument();
        expect(screen.getByText('ENG')).toBeInTheDocument();
    });

    it('should render the English flag and "ENG" when the active locale is "de"', () => {
        (useLocale as jest.Mock).mockReturnValue('de');

        render(<DropdownTrigger {...mockProps} />);

        expect(screen.getByLabelText('german flag')).toBeInTheDocument();
        expect(screen.getByText('DEU')).toBeInTheDocument();
    });

    it('should call handleClick when the button is clicked', () => {
        (useLocale as jest.Mock).mockReturnValue('en');

        render(<DropdownTrigger {...mockProps} />);

        const button = screen.getByRole('button', { name: /eng/i });
        fireEvent.click(button);

        expect(mockProps.handleClick).toHaveBeenCalled();
    });

    it('should call toggleCaret with toggleCaretCallback in useEffect', () => {
        (useLocale as jest.Mock).mockReturnValue('en');

        render(<DropdownTrigger {...mockProps} />);

        expect(mockProps.toggleCaret).toHaveBeenCalled();
    });
});
