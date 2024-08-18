// ContactForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';

// Mock the fetch function
global.fetch = jest.fn();

describe('ContactForm', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders the form correctly', () => {
        render(<ContactForm />);

        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Message:')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Submit' })
        ).toBeInTheDocument();
    });

    it('updates form data when user types', () => {
        render(<ContactForm />);

        const emailInput = screen.getByLabelText('Email:');
        const messageInput = screen.getByLabelText('Message:');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'Test message' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(messageInput).toHaveValue('Test message');
    });

    it('displays error message on failed submission', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(
            new Error('Network error')
        );

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText('Email:'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Message:'), {
            target: { value: 'Test message' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(screen.getByText(/Error:/)).toBeInTheDocument();
        });
    });

    it('shows success message on successful submission', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText('Email:'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Message:'), {
            target: { value: 'Test message' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(
                screen.getByText('Thank you for your submission!')
            ).toBeInTheDocument();
        });
    });

    it('disables submit button while submitting', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(
            () =>
                new Promise((resolve) =>
                    setTimeout(() => resolve({ ok: true }), 100)
                )
        );

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText('Email:'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Message:'), {
            target: { value: 'Test message' },
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Sending...');

        await waitFor(() => {
            expect(
                screen.getByText('Thank you for your submission!')
            ).toBeInTheDocument();
        });
    });

    it('clears form data after successful submission', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        render(<ContactForm />);

        const emailInput = screen.getByLabelText('Email:');
        const messageInput = screen.getByLabelText('Message:');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'Test message' } });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(
                screen.getByText('Thank you for your submission!')
            ).toBeInTheDocument();
        });

        // Re-render the form to check if inputs are cleared
        render(<ContactForm />);

        expect(screen.getByLabelText('Email:')).toHaveValue('');
        expect(screen.getByLabelText('Message:')).toHaveValue('');
    });

    it('handles server error response', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText('Email:'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Message:'), {
            target: { value: 'Test message' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(
                screen.getByText(/An error occurred while submitting the form/)
            ).toBeInTheDocument();
        });
    });
});
