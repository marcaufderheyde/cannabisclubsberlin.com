import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './logo';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Mock the useLocale hook
jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
}));

// Mock the usePathname hook
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

    it('does not trigger onClick when pathname does not match home', () => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (usePathname as jest.Mock).mockReturnValue('/en/about');

        const mockOnClick = jest.fn();

        render(<Logo onClick={mockOnClick} />);

        const linkElement = screen.getByRole('link');
        fireEvent.click(linkElement);

        expect(mockOnClick).not.toHaveBeenCalled();
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
