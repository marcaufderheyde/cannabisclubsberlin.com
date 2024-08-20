import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ImprintContent from './terms-of-use-content';

export const generateMetadata = async () => {
    const t = await getTranslations('Metadata');
    return {
        title: t('terms_of_use_title'),
    };
};

export default function TermsOfUseContent({
    params: { locale },
}: {
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 overflow-visible">
            <ImprintContent />
            <div className="w-2/3"></div>
        </div>
    );
}
