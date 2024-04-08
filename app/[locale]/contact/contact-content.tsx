"use client"
import { useLocale, useTranslations } from 'next-intl';
import ContactForm from './ContactForm';


export default function ContactContent() {
    const t = useTranslations('ContactPage');
    const localActive = useLocale();
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                {t("headline")}
            </h1>
            <p>
            {t("headline_description")}
            </p>
            <p><a href={`mailto:${t("headline_subdescription")}`}>{t("headline_subdescription")}</a></p>
            <ContactForm/>
        </div>
    );
}