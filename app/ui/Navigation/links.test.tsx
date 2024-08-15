import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Links from './links';
import { usePathname } from 'next/navigation';
import isPathNameHome from '@/app/Helpers/isPathnameHome';

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

// Mock the isPathNameHome function
jest.mock('@/app/Helpers/isPathnameHome', () => jest.fn());

describe('Links Component', () => {
    const mockLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    it('renders the links correctly', () => {
        (usePathname as jest.Mock).mockReturnValue('/about');
        (isPathNameHome as jest.Mock).mockReturnValue(false);

        render(<Links links={mockLinks} />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('applies current page styling to the active link', () => {
        (usePathname as jest.Mock).mockReturnValue('/about');
        (isPathNameHome as jest.Mock).mockReturnValue(false);

        render(<Links links={mockLinks} />);

        const aboutLink = screen.getByText('About');
        expect(aboutLink).toHaveClass(
            'text-[#E3E71F] font-bold text-xl group transition duration-300'
        );
    });

    it('applies default styling to non-active links', () => {
        (usePathname as jest.Mock).mockReturnValue('/about');
        (isPathNameHome as jest.Mock).mockReturnValue(false);

        render(<Links links={mockLinks} />);

        const homeLink = screen.getByText('Home');
        const contactLink = screen.getByText('Contact');

        expect(homeLink).toHaveClass(
            'font-normal text-xl group transition duration-300'
        );
        expect(contactLink).toHaveClass(
            'font-normal text-xl group transition duration-300'
        );
    });

    it('applies default styling to all links if on the home page', () => {
        (usePathname as jest.Mock).mockReturnValue('/');
        (isPathNameHome as jest.Mock).mockReturnValue(true);

        render(<Links links={mockLinks} />);

        mockLinks.forEach((link) => {
            const linkElement = screen.getByText(link.name as string);
            expect(linkElement).toHaveClass(
                'font-normal text-xl group transition duration-300'
            );
        });
    });
});
