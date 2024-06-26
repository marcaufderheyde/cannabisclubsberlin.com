import { getTranslations } from 'next-intl/server';
import HarmReductionContent from './harmreduction-content';
import { unstable_setRequestLocale } from 'next-intl/server';

export const generateMetadata = async () => {
    const t = await getTranslations('Metadata');
    return {
        title: t('harm_reduction_title'),
        description: t('harm_reduction_description'),
        keywords: t('harm_reduction_keywords'),
    };
};

export default function About({
    params: { locale },
}: {
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    return (
        <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 overflow-visible'>
            <HarmReductionContent />
        </div>
    );
}
