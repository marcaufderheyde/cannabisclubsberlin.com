'use client';
import { useLocale, useTranslations } from 'next-intl';
import styles from './ClubCard.module.css';
import Image from 'next/image';
import { pullClubsListContent } from './clubsListContent';

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
                    <div className={styles.card} key={index}>
                        <div className={styles.cardNumber}>#{index + 1}</div>
                        <Image
                            src={club.imageUrl}
                            alt={club.name + ' Club Picture'}
                            width={300}
                            height={300}
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{club.name}</h3>
                            <p className={styles.cardDescription}>
                                {club.offerings}
                            </p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
