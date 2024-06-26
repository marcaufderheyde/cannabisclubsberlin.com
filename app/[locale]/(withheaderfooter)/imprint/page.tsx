import { getTranslations } from 'next-intl/server';
import ImprintContent from './imprint-content';
import { unstable_setRequestLocale } from 'next-intl/server';

export const generateMetadata = async () => {
    const t = await getTranslations('Metadata');
    return {
        title: t('imprint_title'),
    };
};

export default function Imprint({
    params: { locale },
}: {
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full">
            <ImprintContent />
            <div className="w-2/3"></div>
        </div>
    );
}
