'use client';
import React from 'react';
import styles from '.ClubCard.module.css';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import ArrowButton from '../ui/Home/arrowbutton';
import Close from '../ui/Navigation/close';

interface Club {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string;
    harm_reduction?: string;
}

interface CustomPopupProps {
    club: Club;
    clubIndex: string;
    onClose: () => void;
    switchNextClub: () => void;
    switchPreviousClub: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
    club,
    onClose,
    switchNextClub,
    switchPreviousClub,
    clubIndex,
}) => {
    const localActive = useLocale();

    return (
        <div className={styles.customPopup}>
            <div className={styles.mapCardContainer}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="close"
                >
                    <Close color={'#828282'} />
                </button>
                <div className="flex flex-col items-center">
                    <a
                        href={`/${localActive}/clubs/${club.slug}`}
                        className={styles.mapCardLink}
                    >
                        <div className={styles.mapCard}>
                            <div className="flex justify-center items-center">
                                <Image
                                    src={club.imageUrl}
                                    alt={`${club.name} Club Picture`}
                                    width={300}
                                    height={300}
                                    className={styles.mapCardImage}
                                />
                            </div>
                            <div className={styles.mapCardContent}>
                                <h3 className={styles.mapCardTitle}>
                                    {club.name}
                                </h3>
                                <p className={styles.mapCardDescription}>
                                    {club.description}
                                </p>
                                <br />
                                <p className={styles.mapCardOfferings}>
                                    {club.offerings}
                                </p>
                            </div>
                        </div>
                    </a>
                    <div
                        className={
                            'absolute bottom-0 inline-flex py-2 px-4 md:py-3'
                        }
                    >
                        <ArrowButton
                            boxClassName={'rounded-l-full'}
                            triangleClassName={'w-8 h-8 p-2 align-middle'}
                            toggleRotate={true}
                            backgroundColor={'bg-lime-500'}
                            triangleColor={'white'}
                            onClickFunction={switchPreviousClub}
                            ariaLabel="previous"
                        />
                        <div className="bg-lime-500 flex text-white text-base p-2">
                            {clubIndex}
                        </div>
                        <ArrowButton
                            boxClassName={'rounded-r-full'}
                            triangleClassName={'w-8 h-8 p-2 align-middle'}
                            toggleRotate={false}
                            backgroundColor={'bg-lime-500'}
                            triangleColor={'white'}
                            onClickFunction={switchNextClub}
                            ariaLabel="next"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPopup;
