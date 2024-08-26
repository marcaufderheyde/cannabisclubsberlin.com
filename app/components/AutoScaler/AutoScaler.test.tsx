import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AutoScaler from './AutoScaler';

jest.mock('@/app/helpers/useWindowSize', () => ({
    __esModule: true,
    default: jest.fn(() => ({ width: 800, height: 600 })),
}));

jest.mock('./helpers/classNameMatcher', () => ({
    __esModule: true,
    default: {
        getCustomWidth: jest.fn((className: string) => '200'),
        getCustomHeight: jest.fn((className: string) => '100'),
    },
}));

describe('AutoScaler Component', () => {
    it('should scale child elements based on the window size and reference screen width', () => {
        const { container } = render(
            <AutoScaler refScreenWidthInPixels="1000">
                <div className="custom-class">Test Content</div>
            </AutoScaler>
        );

        const scaledChild = container.firstChild as HTMLElement;

        expect(scaledChild).toHaveStyle('width: 160px'); // 200 * (800/1000)
        expect(scaledChild).toHaveStyle('height: 80px'); // 100 * (800/1000)
    });

    it('should not display child elements when scaleFactor is zero', () => {
        // Mocking the window size to be zero
        jest.mock('@/app/helpers/useWindowSize', () => ({
            __esModule: true,
            default: jest.fn(() => ({ width: 0, height: 0 })),
        }));

        const { container } = render(
            <AutoScaler refScreenWidthInPixels="1000">
                <div className="custom-class">Test Content</div>
            </AutoScaler>
        );

        const scaledChild = container.firstChild as HTMLElement;

        expect(scaledChild.style.display).toBe('false');
    });
});
