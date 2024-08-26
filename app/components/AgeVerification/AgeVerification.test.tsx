import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AgeVerification from './AgeVerification';

jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
}));

describe('AgeVerification Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should render the age verification modal when localStorage is not set', () => {
        render(<AgeVerification />);

        const header = screen.getByText('header');
        const description = screen.getByText('description');
        const button = screen.getByRole('button', { name: 'button_text' });

        expect(header).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should not render the age verification modal when localStorage is set', () => {
        localStorage.setItem('ageVerified', 'true');

        render(<AgeVerification />);

        expect(screen.queryByText(/header/i)).toBeNull();
        expect(screen.queryByText(/description/i)).toBeNull();
        expect(
            screen.queryByRole('button', { name: /button_text/i })
        ).toBeNull();
    });

    it('should hide the age verification modal after clicking the confirm button', () => {
        render(<AgeVerification />);

        const button = screen.getByRole('button', { name: /button_text/i });
        fireEvent.click(button);

        expect(localStorage.getItem('ageVerified')).toBe('true');
        expect(screen.queryByText(/header/i)).toBeNull();
        expect(screen.queryByText(/description/i)).toBeNull();
        expect(
            screen.queryByRole('button', { name: /button_text/i })
        ).toBeNull();
    });

    it('should use the correct styles for the button', () => {
        render(<AgeVerification />);

        const button = screen.getByRole('button', { name: /button_text/i });

        expect(button).toHaveStyle('color: #FFFFFF');
        expect(button).toHaveStyle('background-color: #B6CF54');
    });
});
