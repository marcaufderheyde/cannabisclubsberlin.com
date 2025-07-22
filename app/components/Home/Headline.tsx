import { useTranslations } from 'next-intl';

export default function Headline() {
    const t = useTranslations('HomePage');
    return (
        <div className='md:max-w-[400px]'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[1.0] text-balance leading-tight text-[#d2b48c] mix-blend-difference'>
                {t('headline')}
            </h1>
        </div>
    );
}
