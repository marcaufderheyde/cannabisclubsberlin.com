'use client';
import React, { ReactElement } from 'react';
import useWindowSize from '../helpers/useWindowSize';

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

    return (
        <div className='absolute bottom-0 z-[3000] w-full h-full bg-[rgba(233,246,166,0.3)] pointer-events-[fill] overflow-hidden pointer-events-none'>
            {/* <div className='absolute bg-white w-[250px] h-[500px] bottom-0 rounded-[3em] translate-y-[+200px] translate-x-[-80px] scale-[0.45] shadow-lg z-[-2] '></div> */}
            <div className='absolute bg-white w-[250px] h-[500px] bottom-0 rounded-[3em] translate-y-[+200px] translate-x-[-150px] shadow-lg scale-[0.60] z-[-1]'></div>
            <Card />
            <div className='absolute bg-white w-[250px] h-[500px] bottom-0 rounded-[3em] translate-y-[+200px] translate-x-[+270px] scale-[0.60] shadow-lg z-[-1]'></div>
            {/* <div className='absolute bg-white w-[250px] h-[500px] bottom-0 rounded-[3em] translate-y-[+200px] translate-x-[+200px] scale-[0.45] shadow-lg z-[-2]'></div> */}
        </div>
    );
}
