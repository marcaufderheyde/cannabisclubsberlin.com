'use client';
import React, { ReactElement, useState } from 'react';
import Swipeable from './Swipeable';
import { Club } from '../helpers/clubsListContent';
import { TouchDetails } from './Swipeable';

export default function SwipeableClubCard({
    club,
    index,
}: {
    readonly club: Club;
    readonly index: number;
}) {
    const [position, setPosition] = useState({
        y: 200,
        x: 60,
    });
    const [transformDuration, setTranformDuration] = useState(0);
    const swipeAnimation = (touchDetails: TouchDetails) => {
        setTranformDuration(0);
        setPosition((prevPosition) => ({
            ...prevPosition,
            x: 60 + touchDetails.distX,
        }));
    };

    const swipeOnCancel = () => {
        setTranformDuration(0.2);
        setPosition({
            y: 200,
            x: 60,
        });
    };

    const translationStyling: React.CSSProperties = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: `transform ${transformDuration}s`,
    };

    return (
        <Swipeable duringSwipe={swipeAnimation} onCancel={swipeOnCancel}>
            <div
                style={translationStyling}
                className={
                    'absolute bg-white w-[250px] h-[500px] bottom-0 rounded-[3em] shadow-lg z-1 pointer-events-auto'
                }
            ></div>
        </Swipeable>
    );
}
