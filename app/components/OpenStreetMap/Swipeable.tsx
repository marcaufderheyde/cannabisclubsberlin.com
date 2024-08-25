'use client';

import { ReactElement, useEffect, useRef } from 'react';
import React from 'react';

enum SwipeStates {
    'up',
    'down',
    'left',
    'right',
    'moving',
    'movingHorizontal',
    'movingVertical',
    'none',
}

export interface TouchDetails {
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
    swipingThreshold: number;
    swipingRestraint: number;
    swipeDownCloseBoundary: number;
    swipeUpCloseBoundary: number;
}

const initTouchDetails: TouchDetails = {
    startX: 0,
    startY: 0,
    distX: 0,
    distY: 0,
    threshold: 50,
    restraint: 100,
    allowedTime: 1000,
    elapsedTime: new Date().getTime(),
    startTime: new Date().getTime(),
    swipeDir: SwipeStates.none,
    swipingThreshold: 5,
    swipingRestraint: 20,
    swipeDownCloseBoundary: 80,
    swipeUpCloseBoundary: -150,
};

export default function Swipeable({
    children,
    onLeftSwipe,
    onRightSwipe,
    onUpSwipe,
    onDownSwipe,
    duringSwipe,
    duringHorizontalSwipe,
    duringVerticalSwipe,
    onDownSwipeClose,
    onCancel,
}: {
    readonly children: ReactElement<any>;
    readonly onLeftSwipe?: Function;
    readonly onRightSwipe?: Function;
    readonly onUpSwipe?: Function;
    readonly onDownSwipe?: Function;
    readonly duringSwipe?: Function;
    readonly duringHorizontalSwipe?: Function;
    readonly duringVerticalSwipe?: Function;
    readonly onDownSwipeClose?: Function;
    readonly onCancel?: Function;
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
                case SwipeStates.moving:
                    if (duringSwipe) duringSwipe(touchDetailsRef.current);
                    break;
                case SwipeStates.movingHorizontal:
                    if (duringHorizontalSwipe)
                        duringHorizontalSwipe(touchDetailsRef.current);
                    break;
                case SwipeStates.movingVertical:
                    if (duringVerticalSwipe)
                        duringVerticalSwipe(touchDetailsRef.current);
                    break;
                case SwipeStates.none:
                    if (onCancel) onCancel();
                    break;
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            const touchDetails = touchDetailsRef.current;
            const touchObj = e.changedTouches[0];
            touchDetails.swipeDir = SwipeStates.none;
            touchDetails.startX = touchObj.pageX;
            touchDetails.startY = touchObj.pageY;
            touchDetails.startTime = new Date().getTime();
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touchDetails = touchDetailsRef.current;
            const touchObj = e.changedTouches[0];
            touchDetails.distX = touchObj.pageX - touchDetails.startX;
            touchDetails.distY = touchObj.pageY - touchDetails.startY;

            if (
                touchDetails.swipeDir != SwipeStates.movingHorizontal &&
                touchDetails.swipeDir != SwipeStates.movingVertical
            ) {
                touchDetails.swipeDir = SwipeStates.moving;

                if (
                    Math.abs(touchDetails.distX) >
                        touchDetails.swipingThreshold &&
                    Math.abs(touchDetails.distY) < touchDetails.swipingRestraint
                ) {
                    touchDetails.swipeDir = SwipeStates.movingHorizontal;
                } else if (
                    Math.abs(touchDetails.distY) >
                        touchDetails.swipingThreshold &&
                    Math.abs(touchDetails.distX) < touchDetails.swipingRestraint
                ) {
                    touchDetails.swipeDir = SwipeStates.movingVertical;
                }
            }

            handleSwipe(touchDetails.swipeDir);
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchDetails = touchDetailsRef.current;
            const touchObj = e.changedTouches[0];

            touchDetails.distX = touchObj.pageX - touchDetails.startX;
            touchDetails.distY = touchObj.pageY - touchDetails.startY;

            touchDetails.swipeDir = SwipeStates.none;

            if (
                Math.abs(touchDetails.distX) >= touchDetails.threshold &&
                Math.abs(touchDetails.distY) < touchDetails.restraint
            ) {
                touchDetails.swipeDir =
                    touchDetails.distX > 0
                        ? SwipeStates.right
                        : SwipeStates.left;
            } else if (
                Math.abs(touchDetails.distY) >= touchDetails.threshold &&
                Math.abs(touchDetails.distX) < touchDetails.restraint
            ) {
                if (
                    touchDetails.distY >= touchDetails.swipeDownCloseBoundary &&
                    onDownSwipeClose
                ) {
                    onDownSwipeClose();
                } else {
                    touchDetails.swipeDir =
                        touchDetails.distY < 0
                            ? SwipeStates.up
                            : SwipeStates.down;
                }
            }

            handleSwipe(touchDetails.swipeDir);
        };

        const currentParentRef = parentRef.current;
        if (parentRef && currentParentRef) {
            currentParentRef.addEventListener('touchstart', handleTouchStart, {
                passive: true,
            });
            currentParentRef.addEventListener('touchmove', handleTouchMove, {
                passive: true,
            });
            currentParentRef.addEventListener('touchend', handleTouchEnd, {
                passive: true,
            });
        }

        return () => {
            if (parentRef && currentParentRef) {
                currentParentRef.removeEventListener(
                    'touchstart',
                    handleTouchStart
                );
                currentParentRef.removeEventListener(
                    'touchmove',
                    handleTouchMove
                );
                currentParentRef.removeEventListener(
                    'touchend',
                    handleTouchEnd
                );
            }
        };
    }, [
        onLeftSwipe,
        onRightSwipe,
        onDownSwipe,
        onUpSwipe,
        duringSwipe,
        duringHorizontalSwipe,
        duringVerticalSwipe,
        onCancel,
        onDownSwipeClose,
    ]);

    return (
        <div ref={parentRef} className="overscroll-none">
            {children}
        </div>
    );
}
