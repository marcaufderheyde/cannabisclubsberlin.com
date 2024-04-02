import Background from '@/app/ui/Home/background';
import ContactContent from './contact-content';
import Navbar from '@/app/ui/Navigation/navbar';
import Footer from '../../ui/Footer/footer';
import HeadComponent from '@/app/Components/HeadComponent';

export default function About() {
    return (
        <div className='flex justify-center min-w-full min-h-full'>
            <Background />
            <HeadComponent />
            <div className='absolute z-[1] flex flex-col justify-start w-full max-w-[1080px] px-6 h-full'>
                <Navbar />
                <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
                    <ContactContent />
                    <div className='w-2/3'></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
