'use client';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ActionButton from '@/app/components/ActionButton/ActionButton';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import generateGoogleMapsLink from '@/app/helpers/generateGoogleMapsLink';

export default function ClubContent() {
    const ClubOpenStreetMap = dynamic(
        () => import('@/app/components/OpenStreetMap/ClubOpenStreetMap'),
        {
            ssr: false,
        }
    );
    const router = useRouter();
    const proxyPathname = usePathname();
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    if (proxyPathname !== null) {
        const pathname = proxyPathname.split('/')[3];
        const club = pullClubsListContent().find(
            (club) => club.slug === pathname
        );
        if (club) {
            club.prices = t(`${club.slug}.prices`);
            club.location = t(`${club.slug}.location`);
            club.description = t(`${club.slug}.description`);
            club.offerings = t(`${club.slug}.offerings`);
            club.harm_reduction = t(`${club.slug}.harm_reduction`);
            club.reviews = t(`${club.slug}.reviews`);
            if (
                club.harm_reduction ===
                    'This club has currently not listed any specific harm reduction services.' ||
                club.harm_reduction ===
                    'Dieser Club hat derzeit keine speziellen Dienste zur Schadensminderung aufgelistet.'
            ) {
                club.hasHRInformation = false;
            }
            const handleBackToMapPage = () => {
                router.push(`/${localActive}/clubs`);
            };

            return (
                <div className="flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16">
                    <h1 className="font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight">
                        {club.name}
                    </h1>
                    <div
                        className="flex flex-row text-lg font-semibold gap-2"
                        onClick={handleBackToMapPage}
                    >
                        <ActionButton
                            backgroundColor={'#B6CF54'}
                            textColor={'#FFFFFF'}
                            href={`/${localActive}/clubs`}
                        >
                            {t('clubs_menu_back_button')}
                        </ActionButton>
                    </div>
                    <div>
                        <Image
                            src={club.imageUrl}
                            alt={club.name + ' Club Picture'}
                            width={300}
                            height={300}
                        />
                    </div>
                    <h2 className="font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight">
                        {t('reviews_title')}
                    </h2>
                    <p>{club.reviews}</p>
                    <h2 className="font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight">
                        {t('price_title')}
                    </h2>
                    <p>{club.prices}</p>
                    <h2 className="font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight">
                        {t('description_title')}
                    </h2>
                    <p>{club.description}</p>
                    <h2 className="font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight">
                        {t('offerings_title')}
                    </h2>
                    <div className="flex flex-row gap-2 flex-wrap mx-3">
                        {club.offerings
                            ?.toString()
                            .split(',')
                            .map((offering) => (
                                <div
                                    key={offering}
                                    className="bg-lime-500 text-white rounded-xl py-1 px-2 self-center overflow-ellipsis"
                                >
                                    {offering}
                                </div>
                            ))}
                    </div>
                    <h2 className="font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight">
                        {t('harm_reduction_title')}
                    </h2>
                    <p>{club.harm_reduction}</p>
                    <h2 className="font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight">
                        {t('visit_website_title')}
                    </h2>
                    <p>
                        {club.clubPageUrl !== '' ? (
                            <a href={club.clubPageUrl} target="_blank">
                                {club.clubPageUrl}
                            </a>
                        ) : (
                            'Link not found...'
                        )}
                    </p>
                    <h2 className="font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight">
                        {t('location_title')}
                    </h2>
                    <a
                        target="_blank"
                        href={generateGoogleMapsLink(
                            club.geoLocation[0],
                            club.geoLocation[1]
                        )}
                    >
                        Route: {club.address}
                    </a>
                    <p>{club.location}</p>
                    <ClubOpenStreetMap club={club} />
                    <br />
                    <div
                        className="flex flex-row text-lg font-semibold gap-2"
                        onClick={handleBackToMapPage}
                    >
                        <ActionButton
                            backgroundColor={'#B6CF54'}
                            textColor={'#FFFFFF'}
                            href={`/${localActive}/clubs`}
                        >
                            {t('clubs_menu_back_button')}
                        </ActionButton>
                    </div>
                </div>
            );
        }
    }
}
