'use client';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import GradientText from '../../../components/GradientText/GradientText';
import Link from 'next/link';

export default function MedicalContent() {
    const t = useTranslations('MedicalPage');
    const localActive = useLocale();

    return (
        <div className="flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16 justify-start items-start">
            {/* Page Header */}
            <PageHeader text={t('headline')} className="scale-100" />

            {/* Introduction Section */}
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
                <li><Link href="#table_of_contents_item1">{t('table_of_contents_item1')}</Link></li>
                <li><Link href="#table_of_contents_item2">{t('table_of_contents_item2')}</Link></li>
                <li><Link href="#table_of_contents_item3">{t('table_of_contents_item3')}</Link></li>
                <li><Link href="#table_of_contents_item4">{t('table_of_contents_item4')}</Link></li>
                <li><Link href="#table_of_contents_item5">{t('table_of_contents_item5')}</Link></li>
                <li><Link href="#table_of_contents_item6">{t('table_of_contents_item6')}</Link></li>
                <li><Link href="#table_of_contents_item7">{t('table_of_contents_item7')}</Link></li>
                <li><Link href="#table_of_contents_item8">{t('table_of_contents_item8')}</Link></li>
            </ul>

            {/* Eligibility Section */}
            <GradientText>
                <h2 id="table_of_contents_item1" className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">

                    {t('eligibility_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('eligibility_text')}
            </p>

            {/* Prescription Process Section */}
            <GradientText>
                <h2 id="table_of_contents_item2" className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">

                    {t('how_to_get_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('how_to_get_text')}
            </p>

            {/* Forms and Dosages Section */}
            <GradientText>
                <h2 id="table_of_contents_item3" className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">

                    {t('forms_dosages_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('forms_dosages_text')}
            </p>

            {/* Costs and Insurance Section */}
            <GradientText>
                <h2 id="table_of_contents_item4" className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">

                    {t('costs_insurance_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('costs_insurance_text')}
            </p>

            {/* Pharmacies and Supply Section */}
            <GradientText>
                <h2 id="table_of_contents_item5" className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">

                    {t('pharmacies_supply_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('pharmacies_supply_text')}
            </p>

            {/* Legal Considerations Section */}
            <GradientText>
                <h2 id="table_of_contents_item6" className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">

                    {t('legal_considerations_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('legal_considerations_text')}
            </p>

            {/* Cannabisgesetz (CannaG) Updates Section */}
            <GradientText>
                <h2 id="table_of_contents_item7" className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">

                    {t('cannag_heading')}
                </h2>
            </GradientText>
            <p className="text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                {t('cannag_text')}
            </p>

            {/* FAQ Section */}
            <GradientText>
                <h2 id="table_of_contents_item8" className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">

                    {t('faq_heading')}
                </h2>
            </GradientText>
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

            {/* Sources & References Section */}
            <GradientText>
                <h2 className="text-[1.5rem] md:text-[2.5rem] font-medium mt-4">
                    {t('sources_heading')}
                </h2>
            </GradientText>
            <ul className="list-disc ml-6 text-[1rem] my-3 md:text-[1.5rem] text-[#575757]">
                <li>
                    <a
                        href="https://www.bfarm.de/DE/Bundesopiumstelle/Cannabis/_node.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        German Federal Institute for Drugs and Medical Devices
                        (BfArM) - Medical Cannabis Regulations
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.g-ba.de/themen/arzneimittel/verordnungsfaehigkeit/medizinisches-cannabis/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        Federal Joint Committee (G-BA) - Prescription Process
                        for Medical Cannabis
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.kbv.de/html/1150_59784.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        National Association of Statutory Health Insurance
                        Physicians - Insurance Coverage for Cannabis
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.bundesgesundheitsministerium.de/themen/medizin-und-forschung/cannabis-als-medizin.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        German Federal Ministry of Health - Overview of Cannabis
                        as Medicine
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.ekah.admin.ch/en/topics/cannabis.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        Swiss Ethics Committee on Cannabis Use (for European
                        comparisons)
                    </a>
                </li>
                <li>
                    <a
                        href="https://flowzz.com/cannabis-auf-rezept"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        Flowzz – Cannabis auf Rezept (2024)
                    </a>
                </li>
                <li>
                    <a
                        href="https://flowzz.com/ratgeber/cannabis-rezept"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        Flowzz Magazin – Medizinisches Cannabis: So leicht kann
                        es gehen
                    </a>
                </li>
            </ul>
        </div>
    );
}
