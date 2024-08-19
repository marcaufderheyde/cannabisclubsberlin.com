import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionButton from './ActionButton';

jest.mock('@/app/components/CustomPopup/Triangle', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: function MockTriangle(props: { color: string }) {
            return React.createElement('div', {
                'data-testid': 'triangle',
                style: { color: props.color },
            });
        },
    };
});

jest.mock('next/link', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: function MockLink(props: any) {
            const { children, href } = props;
            return React.createElement('a', { href, ...props }, children);
        },
    };
});

describe('ActionButton Component', () => {
    it('renders a link when externalLink is false', () => {
        render(
            <ActionButton
                href="/internal-link"
                textColor="white"
                backgroundColor="black"
                className="custom-class"
            >
                Internal Link
            </ActionButton>
        );

        const linkElement = screen.getByText('Internal Link');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/internal-link');
        expect(linkElement).not.toHaveAttribute('target');
        expect(linkElement).toHaveClass('custom-class');
        expect(linkElement).toHaveStyle('color: white');
        expect(linkElement).toHaveStyle('background-color: black');
    });

    it('renders an anchor tag when externalLink is true', () => {
        render(
            <ActionButton
                href="https://external-link.com"
                textColor="white"
                backgroundColor="black"
                externalLink={true}
                className="custom-class"
            >
                External Link
            </ActionButton>
        );

        const anchorElement = screen.getByText('External Link');
        expect(anchorElement).toBeInTheDocument();
        expect(anchorElement).toHaveAttribute(
            'href',
            'https://external-link.com'
        );
        expect(anchorElement).toHaveAttribute('target', '_blank');
        expect(anchorElement).toHaveClass('custom-class');
        expect(anchorElement).toHaveStyle('color: white');
        expect(anchorElement).toHaveStyle('background-color: black');
    });

    it('renders the Triangle component with the correct color', () => {
        render(
            <ActionButton href="/" textColor="white" backgroundColor="black">
                Test Button
            </ActionButton>
        );

        const triangleElement = screen.getByTestId('triangle');
        expect(triangleElement).toBeInTheDocument();
        expect(triangleElement).toHaveStyle('color: white');
    });
});
