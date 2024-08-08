import React from 'react';
import styles from '@/app/styles/ClubCard.module.css';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { useRef, useState } from 'react';
import Close from '@/app/ui/Navigation/close';
import MapHamburgerButton from './MapHamburgerButton';

export type DesktopClubsListProps = {
    clubClickedFromList: (index: number) => void;
    setClubListExpanded: (isExpanded: boolean) => void;
};

export default function DesktopClubList({
    clubClickedFromList,
    setClubListExpanded,
    ...props
}: {
    clubClickedFromList: (index: number) => void;
    setClubListExpanded: (isExpanded: boolean) => void;
}) {
    const clubs = pullClubsListContent();
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const [desktopClubListExpanded, setDesktopClubListExpanded] =
        useState(false);

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
        club.harmReduction = t(`${club.slug}.harm_reduction`);
    });
    const handleClick = (index: number) => {
        if (refs.current[index]) {
            refs.current[index].scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="h-full">
            <div
                className="w-[300px] z-[2005] bg-white overflow-y-scroll flex flex-wrap gap-5 mb-auto h-full justify-center"
                {...props}
            >
                <button
                    className={
                        'absolute z-[2008] top-0 right-[300px] p-2 bg-transparent border-none text-2xl cursor-pointer bg-lime-300'
                    }
                    onClick={() => {
                        setDesktopClubListExpanded(false);
                        setClubListExpanded(false);
                    }}
                >
                    <Close color={'#828282'} />
                </button>
                <div className="relative mt-8">
                    {clubs.map((club, index) => (
                        <div
                            key={index}
                            ref={(el) => (refs.current[index] = el)}
                            className="flex justify-center items-center"
                            onClick={() => {
                                clubClickedFromList(index);
                                handleClick(index);
                            }}
                        >
                            <div
                                className={
                                    'w-[250px] h-[250px] border border-gray-300 rounded-lg overflow-hidden shadow-md'
                                }
                                key={index}
                            >
                                <div className="flex justify-center items-center">
                                    <Image
                                        src={club.imageUrl}
                                        alt={club.name + ' Club Picture'}
                                        width={300}
                                        height={300}
                                        className={styles.cardImage}
                                    />
                                </div>
                                <a
                                    href={`/${localActive}/clubs/${club.slug}`}
                                    key={club.slug}
                                >
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>
                                            {club.name}
                                        </h3>
                                        {/* <p className={styles.cardDescription}>
                                    {club.offerings}
                                </p> */}
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
