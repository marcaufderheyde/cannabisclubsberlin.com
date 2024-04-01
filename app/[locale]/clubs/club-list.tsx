import { useTranslations } from 'next-intl';
import styles from './ClubCard.module.css';
import Logo from '@/public/logo';
import Image from 'next/image';

const clubs = [
    {
        key: 'club1',
        name: 'CSC High Ground Berlin e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club2',
        name: 'Green Social Club e.V., im Norden von Berlin',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club3',
        name: 'Aero Cannabis Club e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club4',
        name: 'Green Leaf Society e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club5',
        name: '420 Club Berlin',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club6',
        name: 'Bastardo CSC Berlin',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club7',
        name: 'CSC Berlin e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club8',
        name: '1000 Berlin 15 e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club9',
        name: 'Cannabis Social Club Köpenick',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club10',
        name: 'CSC High on Earth e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club11',
        name: 'CSC Home of Hemp Berlin e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club12',
        name: 'Cannabis Social Club Prenzlauer Berg Berlin e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club13',
        name: 'Cannabis Social Club meridiem Brandenburgo et Berolina e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club14',
        name: 'Cannabis-Club Lammbock e. V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club15',
        name: 'Cannamo Cannabis Club e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club16',
        name: 'High Society Cannabis Club e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club17',
        name: 'Hype and Dope, Cannabis Club Berlin e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club18',
        name: 'Koala Cannabis Social Club Berlin e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club19',
        name: 'We Love Weed (WLW) – Cannabis Social Club Berlin Kreuzberg e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club20',
        name: 'Anbaufreunde Berlin Social Club e. V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club21',
        name: 'Cannabis Club Lammbock e.V.',
        description: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
];

export default function ClubsList() {
    const t = useTranslations('ClubsPage');
    clubs.forEach((club) => {
        club.description = t(club.key);
    });
    return (
        <div className={styles.container}>
            {clubs.map((club, index) => (
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
                            {club.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
