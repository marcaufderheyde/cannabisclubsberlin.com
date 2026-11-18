import { getTranslations, setRequestLocale } from 'next-intl/server';
import LawContent from './law-content';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Metadata');
    return {
        title: t('law_title'),
        description: t('law_description'),
        keywords: t('law_keywords'),
    };
};

export default async function About({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full">
            <LawContent />
        </div>
    );
}
