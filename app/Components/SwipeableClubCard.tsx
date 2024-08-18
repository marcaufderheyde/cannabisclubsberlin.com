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
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function SwipeableClubCard({
    club,
    index,
    startPosition,
    startScale,
    onDownSwipeClose,
    onUpSwipeClose,
    onRightSwipe,
    onLeftSwipe,
    zHeight,
    canSwipe = true,
}: {
    readonly club: Club;
    readonly index: number;
    readonly startPosition: Position;
    readonly startScale: number;
    onDownSwipeClose?: Function;
    onUpSwipeClose?: Function;
    onRightSwipe?: Function;
    onLeftSwipe?: Function;
    readonly zHeight: number;
    readonly canSwipe: boolean;
}) {
    const [position, setPosition] = useState({
        y: startPosition.y,
        x: startPosition.x,
    });
    const localActive = useLocale();

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

    const swipeVerticalAnimation = (touchDetails: TouchDetails) => {
        if (canSwipe) {
            setTranformDuration(0);
            setPosition((prevPosition) => ({
                ...prevPosition,
                y:
                    prevPosition.y + touchDetails.distY < startPosition.y
                        ? startPosition.y
                        : startPosition.y + touchDetails.distY,
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

    const router = useRouter();
    const handleExpandToClubPage = () => {
        router.push(`/${localActive}/clubs/${club.slug}`);
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
                onLeftSwipe && onRightSwipe ? swipeVerticalAnimation : () => {}
            }
            onCancel={swipeOnCancel}
            onLeftSwipe={onLeftSwipe}
            onRightSwipe={onRightSwipe}
            onDownSwipeClose={onDownSwipeClose}
            // onUpSwipeClose={onUpSwipeClose}
        >
            {/* <motion.div
                layoutId={`club-${club.slug}`}
                initial={{ height: '100px' }}
                animate={{ height: '800px', width: '400px' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            > */}
            <div
                style={translationStyling}
                className={
                    'overscroll-contained absolute bg-white w-[250px] h-[450px] bottom-0 rounded-[3em] shadow-lg z-1 pointer-events-auto'
                }
            >
                <div className='relative overscroll-contained'>
                    <div className='relative overscroll-contained'>
                        <Image
                            src={club.imageUrl}
                            alt={`${club.name} Club Picture`}
                            width={300}
                            height={300}
                            className='absolute top-[-20px] h-[100px] object-contain p-[5px] rounded-[8px]'
                        />
                    </div>
                    <div className='absolute top-[80px] max-h-[calc(100%-80px)] w-full'>
                        <h1
                            className={
                                'text-black font-bold md:text-[1.5rem] lg:text-[4rem] text-center m-2'
                            }
                            onClick={handleExpandToClubPage}
                        >
                            {club.name}
                        </h1>
                        {/* <div className="mx-2 flex flex-wrap justify-center">
                            {club.offerings?.map((offering: string) => (
                                <span
                                    key={offering}
                                    className="bg-blue-100 text-blue-800 text-xs font-medium me-2 p-0.5 inline-block overflow-hidden text-center rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                                >
                                    {offering}
                                </span>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
            {/* </motion.div> */}
        </Swipeable>
    );
}
