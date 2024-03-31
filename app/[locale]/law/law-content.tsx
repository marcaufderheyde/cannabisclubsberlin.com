import Headline from '@/app/ui/Home/headline';
import Link from 'next/link';
import ActionButton from '@/app/ui/Home/actionbutton';
import { useTranslations } from 'next-intl';

export default function AboutContent() {
    const t = useTranslations('LawPage');
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
                    <div className='md:max-w-[400px]'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                {t("headline")}
            </h1>
        </div>
            <p className='md:text-[1.5rem] text-[#2E2E2E] md:max-w-[500px]'>
                {t("headline_description")}
            </p>
            <p className='md:text-[1.5rem] text-[#2E2E2E] md:max-w-[500px]'>
                {t("headline_subdescription")}
            </p>
        </div>
    );
}