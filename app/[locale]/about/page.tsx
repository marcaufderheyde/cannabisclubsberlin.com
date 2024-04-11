import AboutContent from './about-content';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export default function About({
    params: { locale },
}: {
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);

    return (
        <>
            <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
                <AboutContent />
            </div>
            <div className='absolute overflow-hidden w-full h-full left-0 top-0 z-[-1]'>
                <div className='relative w-full h-full'>
                    <Image
                        className='hidden lg:block lg:absolute lg:bottom-[-840px] lg:right-[-300px] lg:transform lg:rotate-[-26deg]'
                        src='/clubs-tile.png'
                        width={1226.63}
                        height={1226.63}
                        alt='Picture of various logos from different cannabis social clubs.'
                    />
                </div>
            </div>
        </>
    );
}
