'use client';
import Headline from '@/app/ui/Home/headline';
import ActionButton from '@/app/ui/Home/actionbutton';
import { useLocale, useTranslations } from 'next-intl';

export default function Content() {
    const t = useTranslations('HomePage');
    const localActive = useLocale();
    return (
        <div className='flex flex-col gap-8 md:gap-12'>
            <Headline />
            <p className='md:text-[1.5rem] text-[#2E2E2E] md:max-w-[500px]'>
                {t('headline_description')}
            </p>
            <div className='flex flex-row text-lg font-semibold gap-2'>
                <ActionButton
                    backgroundColor={'#B6CF54'}
                    textColor={'#FFFFFF'}
                    href={`/${localActive}/clubs`}
                >
                    {t('discover_button')}
                </ActionButton>
                <ActionButton
                    backgroundColor={'#ffffff'}
                    textColor={'#8E8A8A'}
                    href={`/${localActive}/law`}
                >
                    {t('local_laws_button')}
                </ActionButton>
            </div>
        </div>
    );
}
