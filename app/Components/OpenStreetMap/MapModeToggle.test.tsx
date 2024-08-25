import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapModeToggle from './MapModeToggle';

describe('MapModeToggle Component', () => {
    it('renders the toggle button', () => {
        render(<MapModeToggle isDarkMode={true} setIsDarkMode={() => {}} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays the Sun icon when in dark mode', () => {
        render(<MapModeToggle isDarkMode={true} setIsDarkMode={() => {}} />);
        expect(
            screen.getByLabelText('Switch to light mode')
        ).toBeInTheDocument();
    });

    it('displays the Moon icon when in light mode', () => {
        render(<MapModeToggle isDarkMode={false} setIsDarkMode={() => {}} />);
        expect(
            screen.getByLabelText('Switch to dark mode')
        ).toBeInTheDocument();
    });

    it('calls setIsDarkMode with the opposite value when clicked', () => {
        const setIsDarkModeMock = jest.fn();
        render(
            <MapModeToggle
                isDarkMode={true}
                setIsDarkMode={setIsDarkModeMock}
            />
        );

        fireEvent.click(screen.getByLabelText('Switch to light mode'));
        expect(setIsDarkModeMock).toHaveBeenCalledWith(false);

        setIsDarkModeMock.mockReset();
        render(
            <MapModeToggle
                isDarkMode={false}
                setIsDarkMode={setIsDarkModeMock}
            />
        );

        fireEvent.click(screen.getByLabelText('Switch to dark mode'));
        expect(setIsDarkModeMock).toHaveBeenCalledWith(true);
    });

    it('has the correct aria-label', () => {
        const { rerender } = render(
            <MapModeToggle isDarkMode={true} setIsDarkMode={() => {}} />
        );
        expect(screen.getByRole('button')).toHaveAttribute(
            'aria-label',
            'Switch to light mode'
        );

        rerender(<MapModeToggle isDarkMode={false} setIsDarkMode={() => {}} />);
        expect(screen.getByRole('button')).toHaveAttribute(
            'aria-label',
            'Switch to dark mode'
        );
    });

    it('has the correct CSS classes', () => {
        render(<MapModeToggle isDarkMode={true} setIsDarkMode={() => {}} />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'absolute bottom-4 left-4 z-[1000] bg-white rounded-full p-2 shadow-md'
        );
    });
});
