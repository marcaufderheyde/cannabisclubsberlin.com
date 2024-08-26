'use client';
import React, { CSSProperties, useMemo } from 'react';
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

    const shownCards = useMemo(() => {
        const calcStartPosition = (distance: number) => {
            if (!windowSize) {
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

        const minIndex = mod(
            currentIndex - Math.floor((preRenderCount - 1) / 2),
            items.length
        );
        const maxIndex = mod(
            currentIndex + Math.floor((preRenderCount - 1) / 2),
            items.length
        );

        const cards: CardInfo[] = [];
        let i = minIndex;
        let distance = -Math.floor((preRenderCount - 1) / 2);
        let iterations = 0; // safeguard to avoid infinite loop

        while (
            iterations < items.length &&
            inBetweenBounds(minIndex, maxIndex, items.length, i)
        ) {
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
            iterations++; // increment safeguard counter
        }

        return cards;
    }, [
        windowSize,
        cardWidth,
        currentIndex,
        items.length,
        preRenderCount,
        onDownSwipeClose,
        onLeftSwipe,
        onRightSwipe,
    ]);

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
