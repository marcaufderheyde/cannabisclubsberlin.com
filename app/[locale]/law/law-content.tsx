'use client';
import { useTranslations } from 'next-intl';

export default function AboutContent() {
    const t = useTranslations('LawPage');
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <div className='md:max-w-[400px]'>
                <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                    {t('headline')}
                </h1>
            </div>
            <p className='md:text-[1.2rem] text-[#2E2E2E] md:max-w-[500px]'>
                {t('headline_description')}{' '}
                <a href='https://www.bundesgesundheitsministerium.de/themen/cannabis/faq-cannabisgesetz#:~:text=Das%20Inkrafttreten%20der%20Regelungen%20zu,dahin%20bleibt%20Cannabis%20weiterhin%20verboten.'>
                    Click here.
                </a>
            </p>
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
                <h2 className='font-bold text-1xl'>
                    7. {t('term_seven_title')}{' '}
                </h2>
                <p>{t('term_seven')}</p>
            </div>
        </div>
    );
}
