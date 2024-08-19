'use client';
import { useTranslations } from 'next-intl';

export default function ImprintContent() {
    const t = useTranslations('ImprintPage');
    return (
        <div className="flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16">
            <h1 className="font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight">
                {t('headline')}
            </h1>
            <p>{t('headline_description')}</p>
            <div>
                <h2 className="font-bold text-1xl">{t('operator_title')}:</h2>
                <p>{t('operator_one')}</p>
                <p>{t('operator_two')}</p>
                <p>{t('operator_three')}</p>
                <br />
                <h2 className="font-bold text-1xl">{t('contact_title')}: </h2>
                <p>{t('contact_one')}</p>
                <p>{t('contact_two')}</p>
                <br />
                <h2 className="font-bold text-1xl">
                    {t('responsibility_title')}:{' '}
                </h2>
                <p>{t('responsibility_one')}</p>
                <p>{t('responsibility_two')}</p>
                <p>{t('responsibility_three')}</p>
                <br />
                <p>{t('disclaimer')}</p>
            </div>
        </div>
    );
}
