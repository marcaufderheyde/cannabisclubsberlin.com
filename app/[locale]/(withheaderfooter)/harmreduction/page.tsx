import { getTranslations, setRequestLocale } from 'next-intl/server';
import HarmReductionContent from './harmreduction-content';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Metadata');
    return {
        title: t('harm_reduction_title'),
        description: t('harm_reduction_description'),
        keywords: t('harm_reduction_keywords'),
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
        <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 overflow-visible'>
            <HarmReductionContent />
        </div>
    );
}
