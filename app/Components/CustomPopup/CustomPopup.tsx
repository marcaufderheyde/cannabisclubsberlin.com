'use client';
import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import ArrowButton from './Arrowbutton';
import Close from '../Close/Close';
import styles from '@/app/components/OpenStreetMap/ClubCard.module.css';

interface Club {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string[];
    harm_reduction?: string;
    hasHRInformation: boolean;
}

interface CustomPopupProps {
    club: Club;
    clubs: Club[];
    clubIndex: number;
    onClose: () => void;
    switchNextClub: () => void;
    switchPreviousClub: () => void;
    clubListExpanded: boolean;
    style?: React.CSSProperties;
}

export default function CustomPopup({
    club,
    clubs,
    onClose,
    switchNextClub,
    switchPreviousClub,
    clubIndex,
    clubListExpanded,
    ...props
}: CustomPopupProps) {
    const localActive = useLocale();

    return (
        <div className="w-[400px] bg-white flex flex-col h-full">
            <div className="grid grid-rows-[1fr_6fr] grid-cols-[1fr_5fr_1fr] justify-items-center items-center my-2">
                <Image
                    src={club.imageUrl}
                    alt={`${club.name} Club Picture`}
                    height={180}
                    width={300}
                    layout="raw"
                    className={
                        styles.mapCardImage +
                        ' col-start-2 col-end-3 row-start-1 row-end-3 h-[180px]'
                    }
                />
                <button
                    className={
                        styles.closeButton +
                        ' col-start-1 col-end-1 row-start-1 row-end-2 '
                    }
                    onClick={onClose}
                >
                    <Close color={'#828282'} />
                </button>
            </div>
            <div className="flex flex-col items-center align-middle text-center mx-3">
                <a
                    href={`/${localActive}/clubs/${club.slug}`}
                    className={styles.mapCardLink}
                >
                    <h3 className={styles.mapCardTitle}>{club.name}</h3>
                </a>
                <br />
            </div>
            <div className="flex flex-row gap-2 flex-wrap mx-3">
                {club.offerings
                    ?.toString()
                    .split(',')
                    .map((offering) => (
                        <div
                            key={offering}
                            className="bg-lime-500 text-white rounded-xl py-1 px-2 self-center overflow-ellipsis"
                        >
                            {offering}
                        </div>
                    ))}
            </div>
            <div className="h-[100%] grid grid-cols-1 grid-rows-[1fr_auto_1fr] justify-items-center">
                <div
                    className={
                        'row-start-4 row-end-4 inline-flex py-2 px-4 md:py-3'
                    }
                >
                    <ArrowButton
                        boxClassName={'rounded-l-full'}
                        triangleClassName={'w-8 h-8 p-2 align-middle'}
                        toggleRotate={true}
                        backgroundColor={'bg-lime-500'}
                        triangleColor={'white'}
                        onClickFunction={() => switchPreviousClub()}
                    />
                    <div className="bg-lime-500 flex text-white text-base p-2 w-[60px] justify-center">
                        <div>
                            {
                                (((clubIndex + 1) as unknown as string) +
                                    '/' +
                                    clubs.length) as string
                            }
                        </div>
                    </div>
                    <ArrowButton
                        boxClassName={'rounded-r-full'}
                        triangleClassName={'w-8 h-8 p-2 align-middle'}
                        toggleRotate={false}
                        backgroundColor={'bg-lime-500'}
                        triangleColor={'white'}
                        onClickFunction={() => switchNextClub()}
                    />
                </div>
            </div>
        </div>
    );
}
