'use client';
import React from 'react';
import styles from '@/app/styles/ClubCard.module.css';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Triangle from '../ui/Home/triangle';

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
                <button className={styles.closeButton} onClick={onClose}>
                    ×
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
                                <p className={styles.mapCardOfferings}>
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
                            'inline-flex py-2 px-4 md:py-3 md:px-7 flex flex-row justify-center rounded-3xl cursor-pointer items-center gap-3 border-rose-600'
                        }
                    >
                        <button onClick={switchPreviousClub}>
                            <Triangle toggleRotate={true} color={'red'} />
                        </button>
                        <div>{clubIndex}</div>
                        <button onClick={switchNextClub}>
                            <Triangle toggleRotate={false} color={'red'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPopup;
