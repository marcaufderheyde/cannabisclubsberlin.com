'use client';
import React, {
    MouseEventHandler,
    ReactElement,
    useEffect,
    useState,
} from 'react';
import Swipeable from './Swipeable';
import { Club } from '../helpers/clubsListContent';
import { TouchDetails } from './Swipeable';
import { Position } from './SwipeableDeck';
import Image from 'next/image';
import PageHeader from './PageHeader';
import styles from '@/app/styles/ClubCard.module.css';
import Close from '@/app/ui/Navigation/close';

export default function SwipeableClubCard({
    club,
    index,
    startPosition,
    startScale,
    onClose,
    onRightSwipe,
    onLeftSwipe,
    zHeight,
    canSwipe = true,
}: {
    readonly club: Club;
    readonly index: number;
    readonly startPosition: Position;
    readonly startScale: number;
    onClose: () => void;
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

    const swipeHorizontalAnimation = (touchDetails: TouchDetails) => {
        if (canSwipe) {
            setTranformDuration(0);
            setPosition((prevPosition) => ({
                ...prevPosition,
                x: startPosition.x + touchDetails.distX,
            }));
        }
    };

    const swipeVecticalAnimation = (touchDetails: TouchDetails) => {
        if (canSwipe) {
            setTranformDuration(0);
            setPosition((prevPosition) => ({
                ...prevPosition,
                y: startPosition.y + touchDetails.distY,
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
            duringHorizontalSwipe={
                onLeftSwipe && onRightSwipe
                    ? swipeHorizontalAnimation
                    : () => {}
            }
            duringVerticalSwipe={
                onLeftSwipe && onRightSwipe ? swipeVecticalAnimation : () => {}
            }
            onCancel={swipeOnCancel}
            onLeftSwipe={onLeftSwipe}
            onRightSwipe={onRightSwipe}
        >
            <div
                style={translationStyling}
                className={
                    'absolute bg-white w-[250px] h-[70%] bottom-0 rounded-[3em] shadow-lg z-1 pointer-events-auto'
                }
            >
                <button
                    className='absolute top-2 left-2 p-1 bg-none border-none text-2xl cursor-pointer z-[3000]'
                    onClick={onClose}
                >
                    <Close color={'#828282'} />
                </button>
                <div className='relative'>
                    <div className='relative'>
                        <Image
                            src={club.imageUrl}
                            alt={`${club.name} Club Picture`}
                            width={300}
                            height={300}
                            className='absolute top-[-20px] h-[100px] object-contain p-[5px] rounded-[8px]'
                        />
                    </div>
                    <div className='absolute top-[80px] overflow-hidden'>
                        <h1
                            className={
                                'text-black font-bold md:text-[4rem] text-center m-2'
                            }
                        >
                            {club.name}
                        </h1>
                        <p className='bg-gray-200 mx-2 px-2 pt-2 rounded-xl text-left text-ellipsis text-sm sm:text-base md:text-lg m-2 line-clamp-5 text-wrap'>
                            {club.description}
                        </p>
                        <div className='mx-2 overflow-hidden justify-center'>
                            {club.offerings?.map((offering) => (
                                <span className='bg-blue-100 text-blue-800 text-xs font-medium me-2 p-0.5 inline-block overflow-hidden text-center rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>
                                    {offering}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Swipeable>
    );
}
