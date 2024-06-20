import React from 'react';
import ClubsContent from './clubs-content';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export const generateMetadata = async () => {
    const t = await getTranslations('Metadata');
    return {
        title: t('clubs_title'),
        description: t('clubs_description'),
        keywords: t('clubs_keywords'),
    };
};

export default function Clubs({
    params: { locale },
}: {
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-col w-full max-w-none justify-center md:justify-between items-center h-full md:pl-[YourNavbarWidth]">
            <ClubsContent />
        </div>
    );
}
