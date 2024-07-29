import React from 'react';
import styles from '@/app/styles/ClubCard.module.css';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { useRef } from 'react';

export type DesktopClubsListProps = {
    clubClickedFromList: (index: number) => void;
};

export default function DesktopClubList(props: DesktopClubsListProps) {
    const clubs = pullClubsListContent();
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
    });
    const handleClick = (index: number) => {
        if (refs.current[index]) {
            refs.current[index].scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="absolute top-[var(--navbar-height)] right-0 z-[2005] bg-white w-[25%] overflow-y-scroll dynamic-height flex flex-wrap justify-center gap-5 mb-auto overflow-y-scroll">
            {clubs.map((club, index) => (
                <div
                    key={index}
                    ref={(el) => (refs.current[index] = el)}
                    className="flex justify-center items-center"
                    onClick={() => {
                        props.clubClickedFromList(index);
                        handleClick(index);
                    }}
                >
                    <div
                        className={
                            'w-[300px] h-[300px] border border-gray-300 rounded-lg overflow-hidden shadow-md'
                        }
                        key={index}
                    >
                        <a
                            href={`/${localActive}/clubs/${club.slug}`}
                            key={club.slug}
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
    );
}
