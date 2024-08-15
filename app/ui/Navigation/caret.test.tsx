import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Caret from './caret';

describe('Caret Component', () => {
    it('renders the Caret icon with the correct color', () => {
        render(<Caret color="blue" />);

        const caretElement = screen.getByTestId('caret-svg');
        expect(caretElement).toBeInTheDocument();
        const pathElement = caretElement.querySelector('path');
        expect(pathElement).toHaveAttribute('stroke', 'blue');
    });
});
