import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GradientText from './GradientText';

describe('GradientText Component', () => {
    it('should render children with the gradient background', () => {
        const text = 'Test Text';

        render(
            <GradientText>
                <span>{text}</span>
            </GradientText>
        );

        expect(screen.getByText(text)).toBeInTheDocument();

        const gradientElement = screen.getByText(text)
            .nextSibling as HTMLElement;
        expect(gradientElement).toBeInTheDocument();
        expect(gradientElement).toHaveClass(
            'w-[6rem]',
            'md:w-[8rem]',
            'lg:w-[12rem]',
            'h-[1.2em]',
            'md:h-[1.625em]',
            'bg-gradient-to-r',
            'from-[#B6CF54]',
            'to-white',
            'absolute',
            'bottom-[-0.313em]',
            'lg:bottom-[-0.3em]',
            'z-[-1]',
            'text-inherit'
        );
    });

    it('should apply the passed className to the wrapper div', () => {
        const customClass = 'custom-class';
        render(
            <GradientText className={customClass}>
                <span>Test Text</span>
            </GradientText>
        );

        const wrapperDiv = screen.getByText('Test Text').parentElement
            ?.parentElement as HTMLElement;
        expect(wrapperDiv).toHaveClass(customClass);
    });
});
