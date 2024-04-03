import AboutContent from './about-content';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function About({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
            <AboutContent />
        </div>
    );
}
