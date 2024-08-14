import { renderHook, act } from '@testing-library/react';
import useWindowSize from './useWindowSize';

describe('useWindowSize Hook', () => {
    beforeEach(() => {
        // Mock the window.outerWidth/outerHeight
        Object.defineProperty(window, 'outerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
        Object.defineProperty(window, 'outerHeight', {
            writable: true,
            configurable: true,
            value: 768,
        });
    });

    it('should return the correct initial window size', () => {
        const { result } = renderHook(() => useWindowSize());

        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(1024);
    });

    it('should return the updated window size after resize', () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            // Update the window size
            window.outerWidth = 800;
            window.outerHeight = 600;

            // Trigger the resize event
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(800);
        expect(result.current.height).toBe(800);
    });
});
