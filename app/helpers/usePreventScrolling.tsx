'use client';
import { useEffect } from 'react';

const scrollKeys: Set<String> = new Set([
    'Enter',
    'Return',
    ' ',
    'PageUp',
    'PageDown',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
]);

export default function usePreventScrolling() {
    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();
        const preventDefaultOnScrollKeys = (e: KeyboardEvent) => {
            if (scrollKeys.has(e.key)) e.preventDefault();
            return false;
        };

        // Needed in Modern Browsers
        // See: https://stackoverflow.com/questions/37721782/what-are-passive-event-listeners
        var supportsPassive = false;

        try {
            const options = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true;
                },
            });

            window.addEventListener(
                'testPassiveIsSupported',
                null as any,
                options
            );

            window.removeEventListener(
                'testPassiveIsSupported',
                null as any,
                options
            );
        } catch (e) {}

        var wheelOpt = supportsPassive ? { passive: false } : false;
        var wheelEvent =
            'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

        function preventScroll() {
            window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
            window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
            window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
            window.addEventListener(
                'keydown',
                preventDefaultOnScrollKeys,
                false
            );
        }

        function enableScroll() {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.removeEventListener(
                wheelEvent,
                preventDefault,
                wheelOpt as any
            );
            window.removeEventListener(
                'touchmove',
                preventDefault,
                wheelOpt as any
            );
            window.removeEventListener(
                'keydown',
                preventDefaultOnScrollKeys,
                false
            );
        }

        preventScroll();

        return () => enableScroll();
    }, []);
}
