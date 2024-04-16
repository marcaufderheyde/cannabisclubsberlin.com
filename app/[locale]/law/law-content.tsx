'use client';
import { useTranslations } from 'next-intl';
import LawSVG from './law-svg';
import LawContainer from './law-container';
import AutoScaler from '@/app/Components/AutoScaler';

export default function AboutContent() {
    const pictureGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        gridAutoFlow: 'row',
    };

    const t = useTranslations('LawPage');
    return (
        <div className='flex flex-col gap-8 md:gap-12 mt-0 md:mt-30 lg:mt-16'>
            <div className='relative flex flex-col md:flex-row justify-between items-start'>
                <div className='relative flex flex-col gap-2 md:gap-6 md:w-[30rem] lg:w-[33rem] md:order-1 order-2'>
                    <h1 className='text-black font-bold text-[2rem] md:text-[3rem] lg:text-[4rem]'>
                        {t('headline')}
                    </h1>
                    <div className='flex flex-row gap-3 text-[1.75rem] md:text-[2.25rem] text-[#575757]'>
                        <h2 className='font-bold'>Berlin</h2>
                        <h2 className='font-extralight'>Germany</h2>
                    </div>
                    <p className='font-normal md:font-light text-[#575757] text-base md:text-[1.25rem]'>
                        {t('headline_description')}{' '}
                        <a href='https://www.bundesgesundheitsministerium.de/themen/cannabis/faq-cannabisgesetz#:~:text=Das%20Inkrafttreten%20der%20Regelungen%20zu,dahin%20bleibt%20Cannabis%20weiterhin%20verboten.'>
                            Click here.
                        </a>
                    </p>
                </div>

                <div
                    style={pictureGridStyle}
                    className='relative self-end xl:right-[-2em] mb-0 md:my-0 xl:top-[-3em] md:order-2 max-w-[50%] order-1 md:self-center'
                >
                    <LawSVG
                        className='max-w-[100%] h-[60px] md:max-w-[100%] md:h-[80px] row-start-1 row-end-2 col-start-2 col-end-3 rotate-[-35deg]'
                        color='rgba(227,231,31,0.56)'
                    />

                    <LawSVG
                        className='max-w-[100%] h-[90px] md:max-w-[100%] md:h-[240px] row-start-1 row-end-3 col-start-3 col-end-4 rotate-[11deg] self-center'
                        color='rgba(182,207,84,1.0)'
                    />

                    <LawSVG
                        className='max-w-[100%] h-[120px] md:max-w-[100%] md:h-[270px] row-start-2 row-end-4 md:row-start-2  md:row-end-4 col-start-1 col-end-3  rotate-[-18deg] self-start md:self-center'
                        color='rgba(227,231,31,0.56)'
                    />
                </div>
            </div>

            <LawContainer
                title={'1. ' + t('term_one_title')}
                text={t('term_one')}
                SvgImage={LawSVG}
            />

            <LawContainer
                title={'2. ' + t('term_two_title')}
                text={t('term_two')}
                SvgImage={LawSVG}
            />

            <LawContainer
                title={'3. ' + t('term_three_title')}
                text={t('term_three')}
                SvgImage={LawSVG}
            />

            <LawContainer
                title={'4. ' + t('term_four_title')}
                text={t('term_four')}
                SvgImage={LawSVG}
            />

            <LawContainer
                title={'5. ' + t('term_five_title')}
                text={t('term_five')}
                SvgImage={LawSVG}
            />

            <LawContainer
                title={'6. ' + t('term_six_title')}
                text={t('term_six')}
                SvgImage={LawSVG}
            />

            <LawContainer
                title={'7. ' + t('term_seven_title')}
                text={t('term_seven')}
                SvgImage={LawSVG}
            />

            <div className='my-10'></div>
        </div>
    );
}
