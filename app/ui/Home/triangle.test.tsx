import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Triangle from './triangle';

describe('Triangle Component', () => {
    it('renders the triangle with the correct color', () => {
        render(<Triangle color="red" toggleRotate={false} />);

        const triangleElement = screen.getByTestId('triangle-svg');
        expect(triangleElement).toBeInTheDocument();
        expect(triangleElement.querySelector('path')).toHaveAttribute(
            'fill',
            'red'
        );
    });

    it('applies the rotate class when toggleRotate is true', () => {
        render(<Triangle color="blue" toggleRotate={true} />);

        const triangleElement = screen.getByTestId('triangle-svg');
        expect(triangleElement).toHaveClass('rotate-180');
    });

    it('applies additional classes passed via className prop', () => {
        render(
            <Triangle
                color="green"
                toggleRotate={false}
                className="custom-class"
            />
        );

        const triangleElement = screen.getByTestId('triangle-svg');
        expect(triangleElement).toHaveClass('custom-class');
    });
});
