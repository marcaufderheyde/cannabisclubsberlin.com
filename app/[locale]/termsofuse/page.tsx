import Background from '@/app/ui/Home/background';
import ImprintContent from './terms-of-use-content';
import Navbar from '@/app/ui/Navigation/navbar';
import Footer from '../../ui/Footer/footer';
import HeadComponent from '@/app/Components/HeadComponent';

export default function TermsOfUseContent() {
    return (
        <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
            <ImprintContent />
            <div className='w-2/3'></div>
        </div>
    );
}
