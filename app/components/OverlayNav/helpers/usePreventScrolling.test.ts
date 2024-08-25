import { renderHook } from '@testing-library/react';
import usePreventScrolling from './usePreventScrolling';

describe('usePreventScrolling', () => {
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;

    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add the correct event listeners on mount', () => {
        renderHook(() => usePreventScrolling());

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'DOMMouseScroll',
            expect.any(Function),
            false
        );

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'keydown',
            expect.any(Function),
            false
        );

        // Check if the right event listener was added based on the browser
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            expect.stringMatching(/^(wheel|mousewheel)$/),
            expect.any(Function),
            expect.any(Object)
        );

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'touchmove',
            expect.any(Function),
            expect.any(Object)
        );
    });

    it('should remove the correct event listeners on unmount', () => {
        const { unmount } = renderHook(() => usePreventScrolling());

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'DOMMouseScroll',
            expect.any(Function),
            false
        );

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'keydown',
            expect.any(Function),
            false
        );

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            expect.stringMatching(/^(wheel|mousewheel)$/),
            expect.any(Function),
            expect.any(Object)
        );

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'touchmove',
            expect.any(Function),
            expect.any(Object)
        );
    });

    it('should prevent default action for scroll keys', () => {
        renderHook(() => usePreventScrolling());

        const keyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');

        window.dispatchEvent(keyEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default action for non-scroll keys', () => {
        renderHook(() => usePreventScrolling());

        const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
        const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');

        window.dispatchEvent(keyEvent);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
});
