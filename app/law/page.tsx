import Background from '@/app/ui/Home/background';
import LawContent from './law-content';
import Navbar from '@/app/ui/Navigation/navbar';
import Footer from '../ui/Footer/footer';

export default function About() {
    return (
        <div className='flex justify-center min-w-full min-h-full'>
            <Background />
            <div className='absolute z-[1] flex flex-col justify-start w-full max-w-[1080px] px-6 h-full'>
                <Navbar />
                <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
                    <LawContent />
                    <div className='w-2/3'></div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}