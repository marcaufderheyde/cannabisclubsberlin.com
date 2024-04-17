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
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridAutoFlow: 'row',
    };

    const cardGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        gridTemplateRows: '1fr 2fr 0.5fr',
        gridAutoFlow: 'row',
    };

    return (
        <div className='md:gap-12 md:mt-30 lg:mt-16 mb-36  relative'>
            <div style={containerGridStyle}>
                <div className='grid col-start-1 col-end-4 row-start-1 row-end-3 bg-[rgba(182,207,84,0.17)] p-[2.8em] grid-cols-subgrid '>
                    <h1 className='font-bold text-4xl md:text-[3.6rem] text-balance leading-tight mb-6 row-start-1 row-end-1 col-start-1 col-end-3'>
                        {t('headline')}
                    </h1>
                    <p className='text-[1.25rem] font-normal row-start-2 row-end-2 col-start-1 col-end-3 mr-[4em] self-start'>
                        {t('headline_description_short')}
                    </p>
                </div>
                <div className='bg-[grey] col-start-3 col-end-5 row-start-2 row-end-5 z-[0] '>
                    Background
                </div>
                <HarmReductionCard
                    title='Drugsand.me'
                    description={t('headline_subdescription')}
                    href={`https://www.drugsand.me/drugs/cannabis/`}
                    actionButtonText={t('drugs_and_me_button')}
                    className='bg-[#5B6575] col-start-1 col-end-4 row-start-4 row-end-6 z-[0] text-white left-[-8em] relative'
                />

                <div className='bg-[grey] col-start-1 col-end-3 row-start-6 row-end-9 z-[-1] relative left-[-2em] top-[-1em]'></div>

                <HarmReductionCard
                    title='Drug Checking Berlin'
                    description={t('drug_checking_berlin')}
                    href={`https://drugchecking.berlin/`}
                    actionButtonText={t('drug_checking_button')}
                    className='bg-[#E2F39F] text-black col-start-2 col-end-5 row-start-7 row-end-10 right-[-4em] relative'
                />
            </div>
        </div>
    );
}
