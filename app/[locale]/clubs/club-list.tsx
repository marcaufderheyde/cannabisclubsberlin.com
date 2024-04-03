"use client"
import { useTranslations } from 'next-intl';
import styles from './ClubCard.module.css';
import Logo from '@/app/ui/Navigation/logo';
import Image from 'next/image';

const clubs = [
    {
        key: 'club1',
        name: 'CSC High Ground Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club1.png',
        clubPageUrl: 'https://csc-highground.de/',
    },
    {
        key: 'club2',
        name: 'Green Social Club e.V., im Norden von Berlin',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club2.webp',
        clubPageUrl: 'https://www.green-social-club.de/',
    },
    {
        key: 'club3',
        name: 'Aero Cannabis Club e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club3.svg',
        clubPageUrl: 'https://www.aerocannabisberlin.com/',
    },
    {
        key: 'club4',
        name: 'Green Leaf Society e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club4.png',
        clubPageUrl: 'https://greenleafsociety.de/',
    },
    {
        key: 'club5',
        name: '420 Club Berlin',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club5.jpeg',
        clubPageUrl: 'https://twitter.com/420_club_berlin',
    },
    {
        key: 'club6',
        name: 'Bastardo CSC Berlin',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club6.png',
        clubPageUrl: 'https://www.bastardo-berlin.de/',
    },
    {
        key: 'club7',
        name: 'CSC Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club7.png',
        clubPageUrl: 'https://csc.berlin/',
    },
    {
        key: 'club8',
        name: '1000 Berlin 15 e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club8.jpeg',
        clubPageUrl: 'https://www.1000berlin15.de/',
    },
    {
        key: 'club9',
        name: 'Cannabis Social Club Köpenick',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club9.webp',
        clubPageUrl: 'https://www.csckoepenick.de/',
    },
    {
        key: 'club10',
        name: 'CSC High on Earth e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club10.png',
        clubPageUrl: 'https://highonearth.de/',
    },
    {
        key: 'club11',
        name: 'CSC Home of Hemp Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club12',
        name: 'Cannabis Social Club Prenzlauer Berg Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club13',
        name: 'Cannabis Social Club meridiem Brandenburgo et Berolina e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club14',
        name: 'Cannabis-Club Lammbock e. V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club15',
        name: 'Cannamo Cannabis Club e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club15.svg',
        clubPageUrl: 'https://cannamo.de/',
    },
    {
        key: 'club16',
        name: 'High Society Cannabis Club e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club17',
        name: 'Hype and Dope, Cannabis Club Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club18',
        name: 'Koala Cannabis Social Club Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club19',
        name: 'We Love Weed (WLW) – Cannabis Social Club Berlin Kreuzberg e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club20',
        name: 'Anbaufreunde Berlin Social Club e. V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
    },
    {
        key: 'club21',
        name: 'Cannabis Club Lammbock e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club21.webp',
        clubPageUrl: 'https://club-lammbock.de/',
    },
];

export default function ClubsList() {
    const t = useTranslations('ClubsPage');
    clubs.forEach((club) => {
        club.description = t(`${club.key}.description`);
        club.offerings = t(`${club.key}.offerings`);
        club.harm_reduction = t(`${club.key}.harm_reduction`);
    });
    return (
        <div className={styles.container}>
            {clubs.map((club, index) => (
                <div className={styles.card} key={index}>
                    <div className={styles.cardNumber}>#{index + 1}</div>
                    <a href={club.clubPageUrl} target="blank"><Image
                        src={club.imageUrl}
                        alt={club.name + ' Club Picture'}
                        width={300}
                        height={300}
                        className={styles.cardImage}
                    /></a>
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
