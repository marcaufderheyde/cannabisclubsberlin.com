import Background from '@/app/ui/Home/background';
import AboutContent from './about-content';
import Navbar from '@/app/ui/Navigation/navbar';
import Footer from '../../ui/Footer/footer';
import HeadComponent from '@/app/Components/HeadComponent';

export default function About() {
    return (
        <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
            <AboutContent />
        </div>
    );
}
