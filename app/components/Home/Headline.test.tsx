import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Headline from '@/app/components/Home/Headline';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
    useTranslations: jest.fn(),
}));

describe('Headline Component', () => {
    beforeEach(() => {
        (useTranslations as jest.Mock).mockReturnValue((key: string) => {
            const translations: { [key: string]: string } = {
                headline: 'Welcome to Our Club',
            };
            return translations[key];
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the headline with correct text and styling', () => {
        render(<Headline />);

        const headlineElement = screen.getByText('Welcome to Our Club');
        expect(headlineElement).toBeInTheDocument();
        expect(headlineElement).toHaveClass(
            'font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'
        );
    });

    it('wraps the headline text in an h1 tag', () => {
        render(<Headline />);

        const headlineElement = screen.getByRole('heading', { level: 1 });
        expect(headlineElement).toBeInTheDocument();
        expect(headlineElement.tagName).toBe('H1');
    });
});
