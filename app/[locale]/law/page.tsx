import { getTranslations } from 'next-intl/server';
import LawContent from './law-content';
import { unstable_setRequestLocale } from 'next-intl/server';

export const generateMetadata = async () => {
    const t = await getTranslations('Metadata');
    return {
        title: t('law_title'),
        description: t('law_description'),
        keywords: t('law_keywords'),
    };
};

export default function About({
    params: { locale },
}: {
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full">
            <LawContent />
        </div>
    );
}
