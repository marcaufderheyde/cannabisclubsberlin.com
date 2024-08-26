import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from './Home-content';
import { useTranslations, useLocale } from 'next-intl';

jest.mock('next-intl', () => ({
    useTranslations: jest.fn(),
    useLocale: jest.fn(),
}));

jest.mock('@/app/components/Home/headline', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: function MockHeadline() {
            return React.createElement(
                'div',
                { 'data-testid': 'headline' },
                'Mock Headline'
            );
        },
    };
});

jest.mock('@/app/components/ActionButton/ActionButton', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: function MockActionButton(props: any) {
            return React.createElement(
                'a',
                {
                    href: props.href,
                    'data-testid': `action-button-${props.children}`,
                },
                props.children
            );
        },
    };
});

describe('Content Component', () => {
    beforeEach(() => {
        (useTranslations as jest.Mock).mockReturnValue((key: string) => {
            const translations: { [key: string]: string } = {
                headline_description: 'This is the headline description.',
                discover_button: 'Discover Clubs',
                local_laws_button: 'Local Laws',
            };
            return translations[key];
        });

        (useLocale as jest.Mock).mockReturnValue('en');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the Headline component', () => {
        render(<Content />);
        expect(screen.getByTestId('headline')).toBeInTheDocument();
    });

    it('renders the description paragraph with correct text', () => {
        render(<Content />);
        const descriptionParagraph = screen.getByText(
            'This is the headline description.'
        );
        expect(descriptionParagraph).toBeInTheDocument();
        expect(descriptionParagraph).toHaveClass(
            'md:text-[1.5rem] text-[#2E2E2E] md:max-w-[500px]'
        );
    });

    it('renders the ActionButtons with correct text and hrefs', () => {
        render(<Content />);
        const discoverButton = screen.getByTestId(
            'action-button-Discover Clubs'
        );
        const localLawsButton = screen.getByTestId('action-button-Local Laws');

        expect(discoverButton).toBeInTheDocument();
        expect(discoverButton).toHaveAttribute('href', '/en/clubs');
        expect(localLawsButton).toBeInTheDocument();
        expect(localLawsButton).toHaveAttribute('href', '/en/law');
    });
});
