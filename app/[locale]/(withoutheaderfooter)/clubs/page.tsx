import React from 'react';
import ClubsContent from './clubs-content';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Metadata');
    return {
        title: t('clubs_title'),
        description: t('clubs_description'),
        keywords: t('clubs_keywords'),
    };
};

export default async function Clubs({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-col w-full max-w-none justify-center md:justify-between items-center h-full ">
            <ClubsContent />
        </div>
    );
}
