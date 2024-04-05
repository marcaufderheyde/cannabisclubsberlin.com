"use client"
import { useLocale, useTranslations } from 'next-intl';
import { generateSlug } from '../club-list';

const club = {
    key: 'club12',
    name: 'Cannabis Social Club Prenzlauer Berg Berlin e.V.',
    description: '',
    offerings: '',
    harm_reduction: '',
    imageUrl: '/berlinBud1.webp',
    clubPageUrl: '',
    slug: "",
};

club.slug = generateSlug(club.name);

export default function ClubContent() {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    club.description = t(`${club.slug}.description`);
    club.offerings = t(`${club.slug}.offerings`);
    club.harm_reduction = t(`${club.slug}.harm_reduction`);

    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                {club.name}
            </h1>
            <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("description_title")}</h2>
            <p>
            {club.description}
            </p>
            <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("offerings_title")}</h2>
            <p>
            {club.offerings}
            </p>
            <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("harm_reduction_title")}</h2>
            <p>
            {club.harm_reduction}
            </p>

        </div>
    );
}