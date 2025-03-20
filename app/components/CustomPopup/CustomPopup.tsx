'use client';
import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import ArrowButton from './Arrowbutton';
import Close from '../Close/Close';
import styles from '../OpenStreetMap/ClubCard.module.css';
import generateGoogleMapsLink from '@/app/helpers/generateGoogleMapsLink';

interface Club {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string[];
    harm_reduction?: string;
    address?: string;
    clubPageUrl?: string;
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

    const cardTopStyle = {
        display: 'grid',
        gridTemplateColumns: '8fr 5fr',
        gridTemplateRows: '2fr 1fr 5fr 3fr',
        alignItems: 'Center',
    };

    return (
        <div className='w-[400px] bg-white flex flex-col h-full'>
            {/* Top Image and Background */}
            <div style={cardTopStyle}>
                {/* Colour background*/}
                <div className='row-start-1 row-end-4 col-start-1 col-end-3 bg-gradient-to-r from-[#55834E] to-[#ABD4A4] min-h-[180px]' />

                {/* Left Column */}
                <div className='row-start-1 row-end-5 col-start-1 col-end-2 grid grid-cols-[2fr_8fr] grid-rows-subgrid justify-items-center'>
                    {/* Close Button */}
                    <button
                        className={
                            styles.closeButton +
                            ' col-start-1 col-end-1 row-start-1 row-end-2'
                        }
                        onClick={onClose}
                    >
                        <Close color={'#ffffff'} />
                    </button>

                    {/* Image Container */}
                    <div
                        className={
                            'w-[180px] h-[120px] bg-[#ffff] row-start-3 row-end-5 col-start-1 col-end-3 self-center shadow-xl'
                        }
                    >
                        <Image
                            src={club.imageUrl}
                            alt={`${club.name} Club Picture`}
                            height={180}
                            width={300}
                            layout='raw'
                            className={
                                styles.mapCardImage +
                                ' col-start-2 col-end-3 row-start-1 row-end-3 h-[120px]'
                            }
                        />
                    </div>
                </div>

                {/* Rating */}
                <div></div>

                {/* Harm Reduction Tag */}
                <div className='row-start-3 row-end-5 col-start-2 col-end-3 justify-self-center self-center translate-y-[50%] mr-5 relative'>
                    {club.hasHRInformation && (
                        <>
                            <div className='bg-white text-[#686868] text-sm font-bold py-3 px-3 rounded-full shadow-lg'>
                                Harm Reduction
                            </div>
                            {/* Green circle with white checkmark */}
                            <div className='absolute -bottom-3 -right-1 bg-[#B6CF54] w-6 h-6 rounded-full flex items-center justify-center shadow-md'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-4 w-4 text-white'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Title Tag, location, webstie, tags */}
            <div className={'flex flex-col mx-7 h-full overflow-hidden'}>
                <div className='flex flex-col gap-1'>
                    {/* Title */}
                    <a
                        href={`/${localActive}/clubs/${club.slug}`}
                        className={styles.mapCardLink}
                    >
                        <h3 className={styles.mapCardTitle + ' '}>
                            {club.name}
                        </h3>
                    </a>
                    {/* Location */}
                    <h4 className='text-[#686868] font-medium text-sm'>
                        {club.address}
                    </h4>
                    {/* Website */}
                    <a
                        className='text-[#454545] hover:text-[#2c2c2c] font-light text-sm mb-3'
                        href={club.clubPageUrl}
                    >
                        Website
                    </a>
                    {/* Tags */}
                    <div className='flex flex-row gap-2 flex-wrap'>
                        {club.offerings
                            ?.toString()
                            .split(',')
                            .map((offering) => (
                                <div
                                    key={offering}
                                    className='bg-[#ABD4A4] text-white text-sm rounded-xl py-1 px-2 self-center overflow-ellipsis shadow-md'
                                >
                                    {offering}
                                </div>
                            ))}
                    </div>
                </div>

                {/* divider */}
                <div className='w-full my-4 border-t border-gray-300'></div>

                {/* description */}
                <div className='min-h-[200px] max-h-[200px] overflow-y-auto pr-1'>
                    <p className='line-clamp-[9] font-light text-sm'>
                        {club.description}
                    </p>
                </div>

                {/* Action Button */}
                <div className='flex justify-end my-6'>
                    <button
                        className='bg-[#ABD4A4] hover:bg-[#4A7445] text-white font-medium py-2 px-6 transition duration-300'
                        onClick={() =>
                            window.open(
                                `/${localActive}/clubs/${club.slug}`,
                                '_blank'
                            )
                        }
                    >
                        View Club
                    </button>
                </div>
            </div>
        </div>
    );
}
