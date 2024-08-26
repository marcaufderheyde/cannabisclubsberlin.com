'use client';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import ActionButton from '../../../components/ActionButton/ActionButton';
import GradientText from '../../../components/GradientText/GradientText';

export default function ReviewsContent() {
    const t = useTranslations('ReviewsPage');
    const localActive = useLocale();
    return (
        <div className="flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16 justify-start items-start">
            <PageHeader
                text={t('headline')}
                className={'scale-100'}
            ></PageHeader>
            <p className="text-xl md:text-3xl lg:text-4xl lg:leading-[2.875rem]  text-[#575757]">
                {t('headline_description_short')}
            </p>
            <GradientText className="col-start-1 col-end-5 row-start-1 row-end-2">
                <h1 className="text-[1.5rem] md:text-[2.5rem] font-medium align-end">
                    {t('ccb_reviews_title')}
                </h1>
            </GradientText>
            <p className="text-[1rem] my-5 md:text-[1.5rem] col-start-1 col-end-5 md:col-end-4 row-start-2 row-end-3 self-start">
                {t('ccb_reviews')}
            </p>
            <GradientText className="col-start-1 col-end-5 row-start-1 row-end-2">
                <h1 className="text-[1.5rem] md:text-[2.5rem] font-medium align-end">
                    {t('ccb_verified_reviews_title')}
                </h1>
            </GradientText>
            <p className="text-[1rem] my-5 md:text-[1.5rem] col-start-1 col-end-5 md:col-end-4 row-start-2 row-end-3 self-start">
                {t('ccb_verified_reviews')}
            </p>
            <ActionButton
                backgroundColor={'#B6CF54'}
                textColor={'#ffffff'}
                href={`/${localActive}/contact`}
            >
                {t('contact_button')}
            </ActionButton>
        </div>
    );
}
