import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('Logo Component', () => {
    it('renders the Logo correctly', () => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (usePathname as jest.Mock).mockReturnValue('/en');

        render(<Logo />);

        expect(screen.getByText('Cannabis')).toBeInTheDocument();
        expect(screen.getByText('Clubs')).toBeInTheDocument();
        expect(screen.getByText('Berlin')).toBeInTheDocument();
    });

    it('links to the correct homepage based on locale', () => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (usePathname as jest.Mock).mockReturnValue('/en');

        render(<Logo />);

        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/en');
    });

    it('handles onClick event when the link is clicked and pathname matches home', () => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (usePathname as jest.Mock).mockReturnValue('/en');

        const mockOnClick = jest.fn();

        render(<Logo onClick={mockOnClick} />);

        const linkElement = screen.getByRole('link');
        fireEvent.click(linkElement);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw error if onClick is not provided', () => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (usePathname as jest.Mock).mockReturnValue('/en');

        render(<Logo />);

        const linkElement = screen.getByRole('link');
        fireEvent.click(linkElement);

        expect(linkElement).toBeInTheDocument();
    });
});
