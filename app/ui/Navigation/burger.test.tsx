import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Burger from './burger';

describe('Burger Component', () => {
    it('renders the Burger icon with the correct color', () => {
        render(<Burger color="red" />);

        const burgerElement = screen.getByTestId('burger-svg');
        expect(burgerElement).toBeInTheDocument();
        const paths = burgerElement.querySelectorAll('path');
        paths.forEach((path) => {
            expect(path).toHaveAttribute('stroke', 'red');
        });
    });
});
