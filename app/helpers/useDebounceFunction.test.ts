import { renderHook, act } from '@testing-library/react';
import useDebounceFunction from './useDebounceFunction';

jest.useFakeTimers();

describe('useDebounceFunction', () => {
    it('should call the function after the specified delay', () => {
        const func = jest.fn();
        const delay = 500;

        const { result } = renderHook(() => useDebounceFunction(func, delay));

        act(() => {
            result.current('arg1', 'arg2');
        });

        expect(func).not.toHaveBeenCalled();
        jest.advanceTimersByTime(delay);
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should reset the delay if called again before the delay ends', () => {
        const func = jest.fn();
        const delay = 300;
        const { result } = renderHook(() => useDebounceFunction(func, delay));

        act(() => {
            result.current('arg1');
        });

        jest.advanceTimersByTime(100);

        act(() => {
            result.current('arg2'); 
        });

        jest.advanceTimersByTime(300);

        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith('arg2');
    });

    it('should handle multiple arguments correctly', () => {
        const func = jest.fn();
        const delay = 500;

        const { result } = renderHook(() => useDebounceFunction(func, delay));

        act(() => {
            result.current('arg1', 'arg2', 'arg3');
        });

        jest.advanceTimersByTime(delay);

        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
    });

    it('should not call the function if unmounted before delay ends', () => {
        const func = jest.fn();
        const delay = 300;
        const { result, unmount } = renderHook(() =>
            useDebounceFunction(func, delay)
        );

        act(() => {
            result.current('arg1');
        });

        unmount();

        jest.advanceTimersByTime(delay);

        expect(func).not.toHaveBeenCalled();
    });

    it('should clear timeout on unmount', () => {
        const func = jest.fn();
        const delay = 300;

        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

        const { result, unmount } = renderHook(() =>
            useDebounceFunction(func, delay)
        );

        act(() => {
            result.current('arg1');
        });

        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();

        clearTimeoutSpy.mockRestore();
    });
});
