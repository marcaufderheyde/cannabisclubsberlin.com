import { renderHook, act } from '@testing-library/react';
import useWindowSize from './useWindowSize';

describe('useWindowSize Hook', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 768,
        });
    });

    it('should return the correct initial window size', () => {
        const { result } = renderHook(() => useWindowSize());

        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(768);
    });

    it('should return the updated window size after resize', () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 600,
            });

            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(800);
        expect(result.current.height).toBe(600);
    });
});

