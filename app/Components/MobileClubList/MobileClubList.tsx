import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { useRef } from 'react';
import styles from '@/app/components/OpenStreetMap/ClubCard.module.css';

export type MobileClubsListProps = {
    clubClickedFromList: (index: number) => void;
    showHRInfo: boolean;
};

export default function MobileClubList(props: MobileClubsListProps) {
    const clubs = pullClubsListContent();
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
        if (
            club.harm_reduction ===
                'This club has currently not listed any specific harm reduction services.' ||
            club.harm_reduction ===
                'Dieser Club hat derzeit keine speziellen Dienste zur Schadensminderung aufgelistet.'
        ) {
            club.hasHRInformation = false;
        } else {
            club.hasHRInformation = true;
        }
    });

    const handleClick = (index: number) => {
        if (refs.current[index]) {
            refs.current[index]!.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filteredClubs = props.showHRInfo
        ? clubs.filter((club) => club.hasHRInformation)
        : clubs;

    return (
        <div className={styles.container}>
            {filteredClubs.map((club, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        refs.current[index] = el;
                    }}
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
