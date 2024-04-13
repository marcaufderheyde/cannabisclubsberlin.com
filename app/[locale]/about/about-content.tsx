'use client';
import PageHeader from '@/app/Components/PageHeader';
import ActionButton from '@/app/ui/Home/actionbutton';
import { useLocale, useTranslations } from 'next-intl';

export default function AboutContent() {
    const t = useTranslations('AboutPage');
    const localActive = useLocale();
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16 justify-start items-start'>
            <PageHeader>{t('headline')}</PageHeader>
            <p className='text-xl md:text-3xl lg:text-4xl lg:leading-[2.875rem]  text-[#575757]'>
                {t('headline_description_short')}
            </p>
            <ActionButton
                backgroundColor={'#B6CF54'}
                textColor={'#ffffff'}
                href={`/${localActive}/clubs`}
            >
                {t('discover_button')}
            </ActionButton>
        </div>
    );
}
