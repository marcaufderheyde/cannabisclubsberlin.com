'use client';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import GradientText from '../../../components/GradientText/GradientText';
import ContactForm from '../../../components/ContactForm/ContactForm';

export default function ContactContent() {
    const t = useTranslations('ContactPage');
    const localActive = useLocale();

    return (
        <div className="flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16 justify-start items-start">
            {/* Page Header (same as before) */}
            <PageHeader text={t('headline')} className="scale-100" />

            {/* FAQ Header (using GradientText to match About page style) */}
            <GradientText className="col-start-1 col-end-5 row-start-1 row-end-2">
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium align-end">
                    {t('faq_headline')}
                </h2>
            </GradientText>

            {/* FAQ Questions & Answers */}
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="text-[1rem] my-3 md:text-[1.5rem] font-bold text-[#575757]">
                        {t('faq_q1')}
                    </h3>
                    <p className="text-[1rem] my-2 md:text-[1.5rem] text-[#575757]">
                        {t('faq_a1')}
                    </p>
                </div>

                <div>
                    <h3 className="text-[1rem] my-3 md:text-[1.5rem] font-bold text-[#575757]">
                        {t('faq_q2')}
                    </h3>
                    <p className="text-[1rem] my-2 md:text-[1.5rem] text-[#575757]">
                        {t('faq_a2')}
                    </p>
                </div>

                <div>
                    <h3 className="text-[1rem] my-3 md:text-[1.5rem] font-bold text-[#575757]">
                        {t('faq_q3')}
                    </h3>
                    <p className="text-[1rem] my-2 md:text-[1.5rem] text-[#575757]">
                        {t('faq_a3')}
                    </p>
                </div>

                <div>
                    <h3 className="text-[1rem] my-3 md:text-[1.5rem] font-bold text-[#575757]">
                        {t('faq_q4')}
                    </h3>
                    <p className="text-[1rem] my-2 md:text-[1.5rem] text-[#575757]">
                        {t('faq_a4')}
                    </p>
                </div>
            </div>

            {/* Contact Form (unchanged) */}
            <ContactForm />
        </div>
    );
}
