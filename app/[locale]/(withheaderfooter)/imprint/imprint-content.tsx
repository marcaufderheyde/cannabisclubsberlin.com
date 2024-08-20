'use client';
import PageHeader from '@/app/components/PageHeader/PageHeader';
import { useTranslations } from 'next-intl';

export default function ImprintContent() {
    const t = useTranslations('ImprintPage');
    return (
        <div className="flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16 justify-start items-start">
            <PageHeader
                text={t('headline')}
                className={'scale-100'}
            ></PageHeader>
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
