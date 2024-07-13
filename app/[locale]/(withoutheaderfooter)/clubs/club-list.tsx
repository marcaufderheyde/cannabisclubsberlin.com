'use client';
import { useLocale, useTranslations } from 'next-intl';
import styles from '@/app/styles/ClubCard.module.css';

import Image from 'next/image';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';

const clubs = pullClubsListContent();

type Props = {
    showHRInfo: boolean;
};

export default function ClubsList({ showHRInfo }: Props) {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
        club.harmReduction = t(`${club.slug}.harm_reduction`);
        if (
            club.harmReduction ===
                'This club has currently not listed any specific harm reduction services.' ||
            club.harmReduction ===
                'Dieser Club hat derzeit keine speziellen Dienste zur Schadensminderung aufgelistet.'
        ) {
            club.hasHRInformation = false;
        } else {
            club.hasHRInformation = true;
        }
    });

    const filteredClubs = showHRInfo
        ? clubs.filter((club) => club.hasHRInformation)
        : clubs;

    return (
        <div className={styles.container}>
            {filteredClubs.map((club, index) => (
                <a href={`/${localActive}/clubs/${club.slug}`} key={club.slug}>
                    <div className="flex justify-center items-center">
                        <div className={styles.card} key={index}>
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
                                <p className={styles.cardDescription}>
                                    {club.offerings}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
