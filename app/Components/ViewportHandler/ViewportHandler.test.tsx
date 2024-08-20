import React from 'react';
import { render, act } from '@testing-library/react';
import ViewportHandler from './ViewportHandler';

describe('ViewportHandler', () => {
    beforeEach(() => {
        // Mock window.innerHeight
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 1000,
        });

        // Mock document.documentElement.style.setProperty
        document.documentElement.style.setProperty = jest.fn();
    });

    it('sets the --vh custom property on mount', () => {
        render(
            <ViewportHandler>
                <div>Test</div>
            </ViewportHandler>
        );

        expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
            '--vh',
            '10px'
        );
    });

    it('updates the --vh custom property on window resize', () => {
        render(
            <ViewportHandler>
                <div>Test</div>
            </ViewportHandler>
        );

        // Simulate window resize
        act(() => {
            window.innerHeight = 800;
            window.dispatchEvent(new Event('resize'));
        });

        expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
            '--vh',
            '8px'
        );
    });

    it('updates the --vh custom property on orientation change', () => {
        render(
            <ViewportHandler>
                <div>Test</div>
            </ViewportHandler>
        );

        // Simulate orientation change
        act(() => {
            window.innerHeight = 600;
            window.dispatchEvent(new Event('orientationchange'));
        });

        expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
            '--vh',
            '6px'
        );
    });

    it('removes event listeners on unmount', () => {
        const { unmount } = render(
            <ViewportHandler>
                <div>Test</div>
            </ViewportHandler>
        );

        const removeEventListenerSpy = jest.spyOn(
            window,
            'removeEventListener'
        );

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'resize',
            expect.any(Function)
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'orientationchange',
            expect.any(Function)
        );
    });

    it('renders children correctly', () => {
        const { getByText } = render(
            <ViewportHandler>
                <div>Test Child</div>
            </ViewportHandler>
        );

        expect(getByText('Test Child')).toBeInTheDocument();
    });
});
