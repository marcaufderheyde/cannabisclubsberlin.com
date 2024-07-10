'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import Swipeable from './Swipeable';
import { Club } from '../helpers/clubsListContent';
import { TouchDetails } from './Swipeable';
import { Position } from './SwipeableDeck';

export default function SwipeableClubCard({
    club,
    index,
    startPosition,
    startScale,
    onRightSwipe,
    onLeftSwipe,
    zHeight,
    canSwipe = true,
}: {
    readonly club: Club;
    readonly index: number;
    readonly startPosition: Position;
    readonly startScale: number;
    onRightSwipe?: Function;
    onLeftSwipe?: Function;
    readonly zHeight: number;
    readonly canSwipe: boolean;
}) {
    const [position, setPosition] = useState({
        y: startPosition.y,
        x: startPosition.x,
    });

    const [transformDuration, setTranformDuration] = useState(0.2);
    const [scale, setScale] = useState(startScale);

    useEffect(() => {
        setTranformDuration(0.2);
        setScale(startScale);
        setPosition(startPosition);
    }, [startPosition]);

    const swipeAnimation = (touchDetails: TouchDetails) => {
        if (canSwipe) {
            setTranformDuration(0);
            setPosition((prevPosition) => ({
                ...prevPosition,
                x: startPosition.x + touchDetails.distX,
            }));
        }
    };

    const swipeOnCancel = () => {
        if (canSwipe) {
            setTranformDuration(0.2);
            setPosition({
                y: startPosition.y,
                x: startPosition.x,
            });
        }
    };

    const translationStyling: React.CSSProperties = {
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transition: `transform ${transformDuration}s`,
        zIndex: `${zHeight}`,
    };

    return (
        <Swipeable
            duringSwipe={
                onLeftSwipe && onRightSwipe ? swipeAnimation : () => {}
            }
            onCancel={swipeOnCancel}
            onLeftSwipe={onLeftSwipe}
            onRightSwipe={onRightSwipe}
        >
            <div
                style={translationStyling}
                className={
                    'absolute bg-white w-[250px] h-[500px] bottom-0 rounded-[3em] shadow-lg z-1 pointer-events-auto'
                }
            >
                {index}
            </div>
        </Swipeable>
    );
}
