import Background from '@/app/ui/Home/background';
import ImprintContent from './imprint-content';
import Navbar from '@/app/ui/Navigation/navbar';
import Footer from '../../ui/Footer/footer';
import HeadComponent from '@/app/Components/HeadComponent';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Imprint({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
            <ImprintContent />
            <div className='w-2/3'></div>
        </div>
    );
}
