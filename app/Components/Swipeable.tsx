'use client';

import { ReactElement, useEffect, useRef } from 'react';
import React from 'react';

enum SwipeStates {
    'up',
    'down',
    'left',
    'right',
    'none',
}

var initTouchDetails: {
    startX: number;
    startY: number;
    distX: number;
    distY: number;
    threshold: number;
    restraint: number;
    allowedTime: number;
    elapsedTime: number;
    startTime: number;
    swipeDir: SwipeStates;
} = {
    startX: 0,
    startY: 0,
    distX: 0,
    distY: 0,
    threshold: 100,
    restraint: 400,
    allowedTime: 3000,
    elapsedTime: new Date().getTime(),
    startTime: new Date().getTime(),
    swipeDir: SwipeStates.none,
};

export default function Swipeable({
    children,
    onLeftSwipe,
    onRightSwipe,
    onUpSwipe,
    onDownSwipe,
}: {
    readonly children: ReactElement<any>;
    readonly onLeftSwipe?: Function;
    readonly onRightSwipe?: Function;
    readonly onUpSwipe?: Function;
    readonly onDownSwipe?: Function;
}) {
    const parentRef = useRef<HTMLDivElement>(null);
    const touchDetailsRef = useRef(initTouchDetails);

    useEffect(() => {
        const handleSwipe = (swipeDir: SwipeStates) => {
            switch (swipeDir) {
                case SwipeStates.up:
                    if (onUpSwipe) onUpSwipe();
                    break;
                case SwipeStates.down:
                    if (onDownSwipe) onDownSwipe();
                    break;
                case SwipeStates.left:
                    if (onLeftSwipe) onLeftSwipe();
                    break;
                case SwipeStates.right:
                    if (onRightSwipe) onRightSwipe();
                    break;
                default:
                    break;
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            var touchDetails = touchDetailsRef.current;
            var touchObj = e.changedTouches[0];
            touchDetails.swipeDir = SwipeStates.none;
            touchDetails.startX = touchObj.pageX;
            touchDetails.startY = touchObj.pageY;
            touchDetails.startTime = new Date().getTime();
        };

        const handleTouchMove = (e: TouchEvent) => {};

        const handleTouchEnd = (e: TouchEvent) => {
            var touchDetails = touchDetailsRef.current;
            var touchObj = e.changedTouches[0];

            touchDetails.distX = touchObj.pageX - touchDetails.startX;

            touchDetails.distY = touchObj.pageY - touchDetails.startY;

            touchDetails.elapsedTime =
                new Date().getTime() - touchDetails.startTime;

            if (touchDetails.elapsedTime <= touchDetails.allowedTime) {
                if (
                    Math.abs(touchDetails.distX) >= touchDetails.threshold &&
                    Math.abs(touchDetails.distY) < touchDetails.restraint
                ) {
                    touchDetails.swipeDir =
                        touchDetails.distX > 0
                            ? SwipeStates.left
                            : SwipeStates.right;
                } else if (
                    Math.abs(touchDetails.distY) >= touchDetails.threshold &&
                    Math.abs(touchDetails.distX) < touchDetails.restraint
                ) {
                    touchDetails.swipeDir =
                        touchDetails.distY < 0
                            ? SwipeStates.up
                            : SwipeStates.down;
                }
            }
            handleSwipe(touchDetails.swipeDir);
        };

        if (parentRef && parentRef.current) {
            parentRef.current.addEventListener('touchstart', handleTouchStart, {
                passive: true,
            });
            parentRef.current.addEventListener('touchmove', handleTouchMove, {
                passive: true,
            });
            parentRef.current.addEventListener('touchend', handleTouchEnd, {
                passive: true,
            });
        }

        return () => {
            if (parentRef && parentRef.current) {
                parentRef.current.removeEventListener(
                    'touchstart',
                    handleTouchStart
                );
                parentRef.current.removeEventListener(
                    'touchmove',
                    handleTouchMove
                );
                parentRef.current.removeEventListener(
                    'touchend',
                    handleTouchEnd
                );
            }
        };
    }, [onLeftSwipe, onRightSwipe]);

    return <div ref={parentRef}>{children}</div>;
}
