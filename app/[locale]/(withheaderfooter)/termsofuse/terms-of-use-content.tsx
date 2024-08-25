'use client';
import PageHeader from '@/app/components/PageHeader/PageHeader';
import { useTranslations } from 'next-intl';

export default function TermsOfUseContent() {
    const t = useTranslations('TermsOfUsePage');
    return (
        <div className='flex flex-col gap-8 md:gap-12 mt-0 md:mt-30 lg:mt-16'>
            <PageHeader
                text={t('headline')}
                className={'scale-100'}
            ></PageHeader>
            <p>{t('headline_description')}</p>
            <div>
                <h2 className='font-bold text-1xl'>1. {t('term_one_title')}</h2>
                <p>{t('term_one')}</p>
                <h2 className='font-bold text-1xl'>
                    2. {t('term_two_title')}{' '}
                </h2>
                <p>{t('term_two')}</p>
                <h2 className='font-bold text-1xl'>
                    3. {t('term_three_title')}
                </h2>
                <p>{t('term_three')}</p>
                <h2 className='font-bold text-1xl'>
                    4. {t('term_four_title')}{' '}
                </h2>
                <p>{t('term_four')}</p>
                <h2 className='font-bold text-1xl'>
                    5. {t('term_five_title')}
                </h2>
                <p>{t('term_five')}</p>
                <h2 className='font-bold text-1xl'>
                    6. {t('term_six_title')}{' '}
                </h2>
                <p>{t('term_six')}</p>
            </div>
        </div>
    );
}
