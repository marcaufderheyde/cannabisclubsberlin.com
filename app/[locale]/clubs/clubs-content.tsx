"use client"
import { useLocale, useTranslations } from 'next-intl';


export default function ClubsContent() {
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                {t("headline")}
            </h1>
            <p>
            {t("headline_description")}
            </p>
            <p>
            {t("headline_subdescription")}
            </p>

        </div>
    );
}