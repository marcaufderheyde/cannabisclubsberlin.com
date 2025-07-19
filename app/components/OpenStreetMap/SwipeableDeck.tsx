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
    const preRenderCount = Math.min(5, items.length); // 5 cards like desktop

    const shownCards = useMemo(() => {
        const calcStartPosition = (distance: number) => {
            if (!windowSize) {
                return { x: 0, y: 200 };
            }
            
            // Responsive centered positioning with percentage-based spacing
            const centerX = windowSize.width! / 2 - cardWidth / 2;
            const spacing = windowSize.width! * 0.5;
            
            return { 
                x: centerX + distance * spacing, 
                y: 200 
            };
        };

        const cards: CardInfo[] = [];
        const startDistance = -Math.floor((preRenderCount - 1) / 2); // -2, -1, 0, 1, 2
        
        for (let i = 0; i < preRenderCount; i++) {
            const cardIndex = (currentIndex - startDistance + i + items.length) % items.length;
            const distance = startDistance + i;
            
            cards.push({
                position: calcStartPosition(distance),
                scale: distance === 0 ? 1.0 : 0.6,
                onDownSwipeClose: distance === 0 ? onDownSwipeClose : () => {},
                onLeftSwipe: distance === 0 ? onLeftSwipe : () => {},
                onRightSwipe: distance === 0 ? onRightSwipe : () => {},
                index: cardIndex,
                zHeight: distance === 0 ? 1 : -Math.abs(distance),
                canSwipe: distance === 0,
            });
        }

        return cards;
    }, [windowSize, currentIndex, items.length, preRenderCount, onDownSwipeClose, onLeftSwipe, onRightSwipe]);

    return (
        <div
            className="lg:hidden absolute bottom-0 z-[2004] inset-0 pointer-events-none overflow-hidden"
            style={{ contain: 'layout size style' }}
            {...props}
        >
            {windowSize &&
                shownCards.map((card) => (
                    <Card
                        key={card.index}
                        club={items[card.index]}
                        startPosition={card.position}
                        startScale={card.scale}
                        index={card.index}
                        onDownSwipeClose={card.onDownSwipeClose}
                        onLeftSwipe={card.onLeftSwipe}
                        onRightSwipe={card.onRightSwipe}
                        zHeight={card.zHeight}
                        canSwipe={card.canSwipe}
                    />
                ))}
        </div>
    );
}
