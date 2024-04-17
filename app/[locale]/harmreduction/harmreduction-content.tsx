'use client';
import ActionButton from '@/app/ui/Home/actionbutton';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HarmReductionContent() {
    const t = useTranslations('HarmReductionPage');
    const localActive = useLocale();

    const containerGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridAutoFlow: 'row',
    };

    const cardGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        gridTemplateRows: '1fr 2fr 0.5fr',
        gridAutoFlow: 'row',
    };

    return (
        <div className='md:gap-12 md:mt-30 lg:mt-16 relative'>
            <div style={containerGridStyle}>
                <div className='grid col-start-1 col-end-4 row-start-1 row-end-3 bg-[rgba(182,207,84,0.17)] p-[2.8em] grid-cols-subgrid '>
                    <h1 className='font-bold text-4xl md:text-[3.6rem] text-balance leading-tight mb-6 row-start-1 row-end-1 col-start-1 col-end-3'>
                        {t('headline')}
                    </h1>
                    <p className='row-start-2 row-end-2 col-start-1 col-end-3 mr-[4em]'>
                        {t('headline_description')}
                    </p>
                </div>
                <div className='bg-[grey] col-start-3 col-end-5 row-start-2 row-end-5 z-[0] '>
                    Background
                </div>
                <div
                    style={cardGridStyle}
                    className='bg-[#5B6575] col-start-1 col-end-4 row-start-4 row-end-6 z-[0] p-[2.8em] text-white left-[1em]'
                >
                    <h2 className='font-bold text-4xl md:text-[3.6rem]  text-balance leading-tight col-start-1 col-end-4 row-start-1 row-end-2'>
                        Drugsand.me
                    </h2>
                    <p className='text-[1.5rem] col-start-1 col-end-3 row-start-2 row-end-3'>
                        {t('headline_subdescription')}
                    </p>
                    <ActionButton
                        backgroundColor={'#B6CF54'}
                        textColor={'#ffffff'}
                        href={`https://www.drugsand.me/drugs/cannabis/`}
                        externalLink={true}
                        className='col-start-3 col-end-4 row-start-3 row-end-4'
                    >
                        {t('drugs_and_me_button')}
                    </ActionButton>
                </div>
                <div className='bg-[grey] col-start-1 col-end-3 row-start-6 row-end-9 z-[-1] relative right-[-2em] top-[-1em]'></div>
                <div className='col-start-2 col-end-5 row-start-7 row-end-10'>
                    <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>
                        Drug Checking Berlin
                    </h2>
                    <p>{t('drug_checking_berlin')}</p>
                    <ActionButton
                        backgroundColor={'#B6CF54'}
                        textColor={'#ffffff'}
                        href={`https://drugchecking.berlin/`}
                        externalLink={true}
                    >
                        {t('drug_checking_button')}
                    </ActionButton>
                </div>
            </div>
        </div>
    );
}
