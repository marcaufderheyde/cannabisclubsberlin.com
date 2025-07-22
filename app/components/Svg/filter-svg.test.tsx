import React from 'react';
import { render } from '@testing-library/react';
import FilterSVG from './filter-svg';

describe('FilterSVG', () => {
    it('renders the filter icon with correct color', () => {
        const testColor = '#868686';
        const { container } = render(
            <FilterSVG color={testColor} className="test-class" />
        );

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('test-class');

        // Check that all three bars are rendered with the correct color
        const bars = container.querySelectorAll('rect');
        expect(bars).toHaveLength(3);
        
        bars.forEach(bar => {
            expect(bar).toHaveAttribute('fill', testColor);
        });
    });

    it('renders with default dimensions and viewBox', () => {
        const { container } = render(<FilterSVG color="#000000" />);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '24');
        expect(svg).toHaveAttribute('height', '24');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('renders three progressive bars creating funnel shape', () => {
        const { container } = render(<FilterSVG color="#000000" />);

        const bars = container.querySelectorAll('rect');
        
        // Top bar (widest)
        expect(bars[0]).toHaveAttribute('x', '3');
        expect(bars[0]).toHaveAttribute('width', '18');
        expect(bars[0]).toHaveAttribute('y', '6');
        
        // Middle bar (medium)
        expect(bars[1]).toHaveAttribute('x', '6');
        expect(bars[1]).toHaveAttribute('width', '12');
        expect(bars[1]).toHaveAttribute('y', '11');
        
        // Bottom bar (narrowest)
        expect(bars[2]).toHaveAttribute('x', '9');
        expect(bars[2]).toHaveAttribute('width', '6');
        expect(bars[2]).toHaveAttribute('y', '16');
    });

    it('renders with proper accessibility attributes', () => {
        const { container } = render(<FilterSVG color="#000000" />);

        const svg = container.querySelector('svg');
        const title = container.querySelector('title');
        const desc = container.querySelector('desc');

        expect(title).toBeInTheDocument();
        expect(title?.textContent).toBe('Filter Icon');
        
        expect(desc).toBeInTheDocument();
        expect(desc?.textContent).toBe('Filter funnel icon with three horizontal bars');
    });

    it('applies custom className when provided', () => {
        const customClass = 'custom-filter-icon';
        const { container } = render(
            <FilterSVG color="#ff0000" className={customClass} />
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveClass(customClass);
    });

    it('renders without className when not provided', () => {
        const { container } = render(<FilterSVG color="#ff0000" />);

        const svg = container.querySelector('svg');
        expect(svg).not.toHaveAttribute('class');
    });
}); 