import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CookieBanner from './CookieBanner';

jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
}));

describe('CookieBanner Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should render the cookie banner if cookies have not been accepted', () => {
        render(<CookieBanner />);

        expect(screen.getByText('description')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'accept_button' })
        ).toBeInTheDocument();
    });

    it('should not render the cookie banner if cookies have already been accepted', () => {
        localStorage.setItem('cookiesAccepted', 'true');

        render(<CookieBanner />);

        expect(screen.queryByText('description')).toBeNull();
        expect(
            screen.queryByRole('button', { name: 'accept_button' })
        ).toBeNull();
    });

    it('should set localStorage and hide the banner when the accept button is clicked', () => {
        render(<CookieBanner />);

        const acceptButton = screen.getByRole('button', {
            name: 'accept_button',
        });
        fireEvent.click(acceptButton);

        expect(localStorage.getItem('cookiesAccepted')).toBe('true');
        expect(screen.queryByText('description')).toBeNull();
        expect(
            screen.queryByRole('button', { name: 'accept_button' })
        ).toBeNull();
    });
});
