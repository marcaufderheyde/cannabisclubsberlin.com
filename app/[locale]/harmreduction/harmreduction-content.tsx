'use client';
import ActionButton from '@/app/ui/Home/actionbutton';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import HarmReductionCard from './harmreduction-card';

export default function HarmReductionContent() {
    const t = useTranslations('HarmReductionPage');
    const localActive = useLocale();

    const containerGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(9, 1fr)',
        gridAutoFlow: 'row',
    };

    return (
        <div className='md:gap-12 md:mt-30 lg:mt-16 mb-36 xl:relative'>
            <div style={containerGridStyle}>
                <div className='grid col-start-1 col-end-5  md:col-end-4 row-start-1 row-end-3 bg-[rgba(182,207,84,0.17)] p-[2.8em] grid-cols-subgrid '>
                    <h1 className='font-bold text-[6vw] md:text-4xl lg:text-[3.6rem] text-balance leading-tight row-start-1 row-end-1 col-start-1 col-end-5 md:col-end-3 self-center mb-8 md:mb-0'>
                        {t('headline')}
                    </h1>
                    <p className='md:[1rem] lg:text-[1.25rem] font-normal row-start-2 row-end-2 col-start-1 col-end-5 md:col-end-3 mr-[4em] self-start'>
                        {t('headline_description_short')}
                    </p>
                </div>
                <div className='bg-[grey] hidden md:block col-start-3 col-end-5 row-start-2 row-end-5 z-[0] md:relative '>
                    <Image
                        alt='Man Seeking Advice'
                        src='/hr-image-1.jpg'
                        fill
                        style={{ objectFit: 'cover' }}
                    ></Image>
                </div>
                <HarmReductionCard
                    title='Drugsand.me'
                    description={t('headline_subdescription')}
                    href={`https://www.drugsand.me/drugs/cannabis/`}
                    actionButtonText={t('drugs_and_me_button')}
                    className='bg-[#5B6575] col-start-1 col-end-5 md:col-end-4 row-start-3 md:row-start-4 row-end-6 z-[0] text-white xl:left-[-5em] relative'
                    buttonBackgroundColor='linear-gradient(to right, rgb(84,126,207), rgb(113,113,113))'
                />

                <div className='bg-[grey] hidden md:block col-start-1 col-end-3 row-start-6 row-end-9 z-[-1] relative xl:left-[-2em] top-[-1em]'>
                    <Image
                        alt='Man Seeking Advice'
                        src='/hr-image-2.jpg'
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    ></Image>
                </div>

                <HarmReductionCard
                    title='Drug Checking Berlin'
                    description={t('drug_checking_berlin')}
                    href={`https://drugchecking.berlin/`}
                    actionButtonText={t('drug_checking_button')}
                    className='bg-[#E2F39F] text-black col-start-1 md:col-start-2 col-end-5 row-start-6 md:row-start-7 row-end-10 xl:right-[-4em] xl:relative'
                    buttonBackgroundColor='linear-gradient(to right, rgb(237,255,213), rgb(215,255,164))'
                    buttonTextColor='black'
                />
            </div>
        </div>
    );
}
