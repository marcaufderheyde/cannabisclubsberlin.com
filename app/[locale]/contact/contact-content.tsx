'use client';
import { useLocale, useTranslations } from 'next-intl';
import ContactForm from './ContactForm';
import PageHeader from '@/app/Components/PageHeader';

export default function ContactContent() {
    const t = useTranslations('ContactPage');
    const localActive = useLocale();
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16 w-full'>
            <PageHeader>{t('headline')}</PageHeader>
            <ContactForm />
        </div>
    );
}
