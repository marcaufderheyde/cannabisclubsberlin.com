import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHeader from './PageHeader';

describe('PageHeader Component', () => {
    it('should render the children within a GradientText component', () => {
        const testText = 'Test Header';

        render(<PageHeader>{testText}</PageHeader>);

        const gradientTextElement = screen.getByLabelText('gradient text');
        expect(gradientTextElement).toBeInTheDocument();

        const headerElement = screen.getByText(testText);
        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toHaveClass(
            'text-black font-bold text-4xl md:text-[4rem] text-balance leading-tight'
        );
    });
});
