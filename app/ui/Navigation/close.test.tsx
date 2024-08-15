import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Close from './close';

describe('Close Component', () => {
    it('renders the Close icon with the correct color', () => {
        render(<Close color="red" />);

        const closeElement = screen.getByTestId('close-svg');
        expect(closeElement).toBeInTheDocument();

        const pathElements = closeElement.querySelectorAll('path');
        expect(pathElements.length).toBe(2);

        pathElements.forEach((path) => {
            expect(path).toHaveAttribute('stroke', 'red');
        });
    });
});
