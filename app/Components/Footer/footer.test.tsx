import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import { useLocale, useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
    useTranslations: jest.fn(),
}));

describe('Footer Component', () => {
    beforeEach(() => {
        (useLocale as jest.Mock).mockReturnValue('en');
        (useTranslations as jest.Mock).mockReturnValue((key: string) => {
            const translations: { [key: string]: string } = {
                imprint: 'Imprint',
                terms_of_use: 'Terms of Use',
            };
            return translations[key];
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the footer with the correct year', () => {
        const currentYear = new Date().getFullYear();

        render(<Footer />);

        expect(
            screen.getByText(
                `© ${currentYear} CannabisClubsBerlin.com. All rights reserved.`
            )
        ).toBeInTheDocument();
    });

    it('should render the imprint link with the correct locale', () => {
        render(<Footer />);

        const imprintLink = screen.getByText('Imprint');
        expect(imprintLink).toBeInTheDocument();
        expect(imprintLink).toHaveAttribute('href', '/en/imprint');
    });

    it('should render the terms of use link with the correct locale', () => {
        render(<Footer />);

        const termsLink = screen.getByText('Terms of Use');
        expect(termsLink).toBeInTheDocument();
        expect(termsLink).toHaveAttribute('href', '/en/termsofuse');
    });

    it('should apply the correct styles to the footer', () => {
        render(<Footer />);

        const footer = screen.getByLabelText('footer');

        // Use window.getComputedStyle to get the computed styles
        const computedStyle = window.getComputedStyle(footer!);

        // Check individual style properties
        expect(computedStyle.position).toBe('fixed');
        expect(computedStyle.bottom).toBe('0px');
        expect(computedStyle.textAlign).toBe('center');
        expect(computedStyle.color).toBe('white');
    });
});
