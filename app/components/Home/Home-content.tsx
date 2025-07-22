'use client';
import Headline from '@/app/components/Home/Headline';
import ActionButton from '@/app/components/ActionButton/ActionButton';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HomeContent() {
    const t = useTranslations('HomePage');
    const localActive = useLocale();
    return (
        <div className='flex flex-col md:flex-row gap-8 lg:gap-12 items-center'>
            {/* Left Content Section */}
            <div className='flex flex-col gap-4 md:gap-6 w-full max-w-[300px] lg:max-w-[400px] lg:flex-shrink-0'>
                <Headline />
                <p className='text-base md:text-[1.5rem] text-[#2E2E2E] lg:max-w-[500px]'>
                    {t('headline_description')}
                </p>
                <div className='flex flex-col sm:flex-row text-lg font-semibold gap-2'>
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

            {/* Right Image Section */}
            <div className='hidden md:flex justify-center items-center w-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] xl:min-h-[700px] px-4 lg:px-8'>
                <div className='relative max-w-[400px] w-[800px] lg:max-w-[900px] aspect-square lg:aspect-[4/3]'>
                    <Image
                        src='/ccb-left.png'
                        alt='Homepage Illustration'
                        fill
                        style={{ objectFit: 'contain' }}
                        className='rounded-lg'
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
