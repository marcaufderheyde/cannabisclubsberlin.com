'use client';
import { useLocale, useTranslations } from 'next-intl';
import styles from '@/app/Components/ClubCard.module.css';

import Image from 'next/image';
import { pullClubsListContent } from '@/app/Helpers/clubsListContent';

const clubs = pullClubsListContent();

export default function ClubsList() {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
    });
    return (
        <div className={styles.container}>
            {clubs.map((club, index) => (
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
