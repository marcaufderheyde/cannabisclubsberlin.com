import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Headline() {
    const t = useTranslations('HomePage');
    return (
        <div className='md:max-w-[400px]'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                {t("headline")}
            </h1>
        </div>
    );
}
