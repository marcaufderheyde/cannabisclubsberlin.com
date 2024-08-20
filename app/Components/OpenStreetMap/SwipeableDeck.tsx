'use client';
import React, { CSSProperties, useEffect, useState } from 'react';
import useWindowSize from '../../helpers/useWindowSize';
import mod from '../../helpers/mod';

export interface Position {
    x: number;
    y: number;
}

export interface CardInfo {
    position: Position;
    scale: number;
    index: number;
    onDownSwipeClose: () => void;
    onLeftSwipe: () => void;
    onRightSwipe: () => void;
    zHeight: number;
    canSwipe: boolean;
}

export default function SwipeableDeck<T>({
    items,
    currentIndex,
    Card,
    onDownSwipeClose,
    onRightSwipe,
    onLeftSwipe,
    ...props
}: {
    items: Array<T>;
    Card: React.JSX.ElementType;
    currentIndex: number;
    onDownSwipeClose: () => void;
    onRightSwipe: () => void;
    onLeftSwipe: () => void;
    style?: CSSProperties;
}) {
    const windowSize = useWindowSize();
    const cardWidth = 250;

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

    const calcStartPosition = (distance: number) => {
        if (windowSize == undefined) {
            return { x: 0, y: 500 };
        } else {
            const middleOfScreen = windowSize.width! / 2;
            const halfCardSize = cardWidth / 2;
            const spaceBetweenCards = 0;
            const x =
                middleOfScreen -
                halfCardSize +
                distance * (cardWidth + spaceBetweenCards);
            return { x: x, y: 200 };
        }
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
            const cards: CardInfo[] = [];
            let distance = -(preRenderCount - 1) / 2;
            while (inBetweenBounds(minIndex, maxIndex, items.length, i)) {
                const startPosition = calcStartPosition(distance);
                const scale = currentIndex == i ? 1.0 : 0.6;
                const cardInfo: CardInfo = {
                    position: startPosition,
                    scale: scale,
                    onDownSwipeClose:
                        i == currentIndex ? onDownSwipeClose : () => {},
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
    }, [currentIndex, windowSize]);

    return (
        <div
            className="overscroll-contained lg:hidden absolute bottom-0 z-[2004] w-full h-full pointer-events-[fill] overflow-clip pointer-events-none "
            {...props}
        >
            {windowSize &&
                shownCards.map((card) => {
                    return (
                        <Card
                            club={items[card.index]}
                            startPosition={card.position}
                            startScale={card.scale}
                            index={card.index}
                            key={card.index}
                            onDownSwipeClose={card.onDownSwipeClose}
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
