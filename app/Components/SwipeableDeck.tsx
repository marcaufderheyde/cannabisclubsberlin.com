'use client';
import React, { ReactElement, useEffect, useState, useMemo } from 'react';
import useWindowSize from '../helpers/useWindowSize';
import mod from '../helpers/mod';

export interface Position {
    x: number;
    y: number;
}

export interface CardInfo {
    position: Position;
    scale: number;
    index: number;
    onLeftSwipe: Function;
    onRightSwipe: Function;
    zHeight: number;
    canSwipe: boolean;
}

export default function SwipeableDeck<T>({
    items,
    currentIndex,
    Card,
    onRightSwipe,
    onLeftSwipe,
}: {
    items: Array<T>;
    Card: React.JSX.ElementType;
    currentIndex: number;
    onRightSwipe: Function;
    onLeftSwipe: Function;
}) {
    const preRenderCount = Math.min(5, items.length);
    const [shownCards, setShownCards] = useState<CardInfo[]>([]);

    const inBetweenBounds = (
        start: number,
        end: number,
        numberItems: number,
        index: number
    ) => {
        start %= numberItems;
        end %= numberItems;
        index %= numberItems;

        if (start <= end) {
            return start <= index && index <= end;
        } else {
            return index >= start || index <= end;
        }
    };

    const calcDistanceToMiddle = (
        start: number,
        end: number,
        middle: number,
        numberItems: number,
        index: number
    ) => {
        if (end < start) {
            if (index <= end && index < start)
                return numberItems + index - middle;
            else middle - index;
        }
        return index - middle;
    };

    useEffect(() => {
        const minIndex = mod(
            currentIndex - (preRenderCount - 1) / 2,
            items.length
        );
        const maxIndex = mod(
            currentIndex + (preRenderCount - 1) / 2,
            items.length
        );

        setShownCards(() => {
            let i = minIndex;
            const cards = [];
            let distance = -(preRenderCount - 1) / 2;
            while (inBetweenBounds(minIndex, maxIndex, items.length, i)) {
                const startPosition = {
                    x: 60 + distance * 250,
                    y: 200,
                };
                const scale = currentIndex == i ? 1.0 : 0.6;
                const cardInfo = {
                    position: startPosition,
                    scale: scale,
                    onLeftSwipe: i == currentIndex ? onLeftSwipe : () => {},
                    onRightSwipe: i == currentIndex ? onRightSwipe : () => {},
                    index: i,
                    zHeight: i == currentIndex ? 1 : -distance,
                    canSwipe: i == currentIndex,
                };
                cards.push(cardInfo);

                i = mod(i + 1, items.length);
                distance += 1;
            }

            return cards;
        });
    }, [currentIndex]);

    return (
        <div className='lg:hidden absolute bottom-0 z-[3000] w-full h-full pointer-events-[fill] overflow-hidden pointer-events-none'>
            {shownCards.map((card) => {
                return (
                    <Card
                        startPosition={card.position}
                        startScale={card.scale}
                        index={card.index}
                        key={card.index}
                        onLeftSwipe={card.onLeftSwipe}
                        onRightSwipe={card.onRightSwipe}
                        zHeight={card.zHeight}
                        canSwipe={card.canSwipe}
                    />
                );
            })}
        </div>
    );
}
