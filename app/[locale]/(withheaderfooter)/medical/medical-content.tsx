'use client';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import GradientText from '../../../components/GradientText/GradientText';

export default function MedicalContent() {
    const t = useTranslations('MedicalPage');
    const localActive = useLocale();

    return (
        <div className="flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16 justify-start items-start">
            {/* Page Header */}
            <PageHeader text={t('headline')} className="scale-100" />

            {/* Intro Section */}
            <h2 className="text-xl md:text-3xl lg:text-4xl text-[#575757] font-medium">
                {t('intro_heading')}
            </h2>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('intro_text')}
            </p>

            {/* Table of Contents */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('table_of_contents_title')}
                </h2>
            </GradientText>
            <ul className="list-disc ml-6 text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                <li>{t('table_of_contents_item1')}</li>
                <li>{t('table_of_contents_item2')}</li>
                <li>{t('table_of_contents_item3')}</li>
                <li>{t('table_of_contents_item4')}</li>
                <li>{t('table_of_contents_item5')}</li>
                <li>{t('table_of_contents_item6')}</li>
                <li>{t('table_of_contents_item7')}</li>
                <li>{t('table_of_contents_item8')}</li>
            </ul>

            {/* Section: Eligibility */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('eligibility_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('eligibility_text')}
            </p>

            {/* Section: How to Get a Prescription */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('how_to_get_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('how_to_get_text')}
            </p>

            {/* Section: Forms and Dosages */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('forms_dosages_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('forms_dosages_text')}
            </p>

            {/* Section: Costs and Insurance */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('costs_insurance_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('costs_insurance_text')}
            </p>

            {/* Section: Pharmacies and Supply */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('pharmacies_supply_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('pharmacies_supply_text')}
            </p>

            {/* Section: Legal Considerations */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('legal_considerations_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('legal_considerations_text')}
            </p>

            {/* Section: FAQ */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('faq_heading')}
                </h2>
            </GradientText>

            {/* FAQ Items */}
            <div className="flex flex-col gap-8">
                <div>
                    <h3 className="text-[1rem] md:text-[1.5rem] font-bold text-[#575757]">
                        {t('faq_q1')}
                    </h3>
                    <p className="text-[1rem] my-2 md:text-[1.5rem] text-[#575757]">
                        {t('faq_a1')}
                    </p>
                </div>

                <div>
                    <h3 className="text-[1rem] md:text-[1.5rem] font-bold text-[#575757]">
                        {t('faq_q2')}
                    </h3>
                    <p className="text-[1rem] my-2 md:text-[1.5rem] text-[#575757]">
                        {t('faq_a2')}
                    </p>
                </div>

                <div>
                    <h3 className="text-[1rem] md:text-[1.5rem] font-bold text-[#575757]">
                        {t('faq_q3')}
                    </h3>
                    <p className="text-[1rem] my-2 md:text-[1.5rem] text-[#575757]">
                        {t('faq_a3')}
                    </p>
                </div>

                <div>
                    <h3 className="text-[1rem] md:text-[1.5rem] font-bold text-[#575757]">
                        {t('faq_q4')}
                    </h3>
                    <p className="text-[1rem] my-2 md:text-[1.5rem] text-[#575757]">
                        {t('faq_a4')}
                    </p>
                </div>
            </div>
        </div>
    );
}
