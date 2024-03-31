import Headline from '@/app/ui/Home/headline';
import Link from 'next/link';
import ActionButton from '@/app/ui/Home/actionbutton';
import { useLocale, useTranslations } from 'next-intl';


export default function AboutContent() {
    const t = useTranslations('AboutPage');
    const localActive = useLocale();
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <p className='md:text-[1.5rem] text-[#2E2E2E] md:max-w-[500px]'>
                {t("headline")}
            </p>
            <p>
            {t("headline_description")}
            </p>
            <p>{t("headline_subdescription")}</p>
            <ActionButton
                backgroundColor={'#B6CF54'}
                textColor={'#ffffff'}
                href={`/${localActive}/law`}
                >
            {t("local_laws_button")}
            </ActionButton>
        </div>
    );
}