import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArrowButton from './Arrowbutton';

// Mock Triangle component
jest.mock('./Triangle', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: function MockTriangle(props: {
            color: string;
            toggleRotate: boolean;
        }) {
            return React.createElement('div', {
                'data-testid': 'triangle',
                class: 'custom-triangle-class',
                style: {
                    color: props.color,
                    transform: props.toggleRotate ? 'rotate(180deg)' : 'none',
                },
            });
        },
    };
});

describe('ArrowButton Component', () => {
    it('renders the ArrowButton with the correct background and triangle color', () => {
        render(
            <ArrowButton
                backgroundColor="bg-black"
                triangleColor="white"
                onClickFunction={() => {}}
                toggleRotate={false}
                ariaLabel="Arrow Button"
            />
        );

        const buttonElement = screen.getByRole('button', {
            name: 'Arrow Button',
        });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('bg-black');

        const triangleElement = screen.getByTestId('triangle');
        expect(triangleElement).toBeInTheDocument();
        expect(triangleElement).toHaveStyle('color: white');
    });

    it('applies the toggleRotate prop to the Triangle component', () => {
        render(
            <ArrowButton
                backgroundColor="bg-black"
                triangleColor="white"
                onClickFunction={() => {}}
                toggleRotate={true}
                ariaLabel="Arrow Button"
            />
        );

        const triangleElement = screen.getByTestId('triangle');
        expect(triangleElement).toHaveStyle('transform: rotate(180deg)');
    });

    it('handles the onClick function when the button is clicked', () => {
        const handleClick = jest.fn();
        render(
            <ArrowButton
                backgroundColor="bg-black"
                triangleColor="white"
                onClickFunction={handleClick}
                toggleRotate={false}
                ariaLabel="Arrow Button"
            />
        );

        const buttonElement = screen.getByRole('button', {
            name: 'Arrow Button',
        });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies the additional classes to the button and triangle', () => {
        render(
            <ArrowButton
                backgroundColor="bg-black"
                triangleColor="white"
                boxClassName="custom-box-class"
                triangleClassName="custom-triangle-class"
                onClickFunction={() => {}}
                toggleRotate={false}
                ariaLabel="Arrow Button"
            />
        );

        const buttonElement = screen.getByRole('button', {
            name: 'Arrow Button',
        });
        expect(buttonElement).toHaveClass('custom-box-class');

        const triangleElement = screen.getByTestId('triangle');
        expect(triangleElement).toHaveClass('custom-triangle-class');
    });
});
