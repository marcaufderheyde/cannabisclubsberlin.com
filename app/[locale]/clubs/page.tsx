import Background from '@/app/ui/Home/background';
import ClubsContent from './clubs-content';
import Navbar from '@/app/ui/Navigation/navbar';
import Footer from '../../ui/Footer/footer';
import HeadComponent from '@/app/Components/HeadComponent';
import ClubsList from './club-list';

export default function Clubs() {
    return (
        <div className='flex justify-center min-w-full min-h-full'>
            <Background />
            <HeadComponent />
            <div className='absolute z-[1] flex flex-col justify-start w-full max-w-[1080px] px-6 h-full'>
                <Navbar />
                <div className='flex flex-col md:flex-col w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 md:pl-[YourNavbarWidth]'>
                    <ClubsContent />
                    <ClubsList />
                </div>
            </div>
            <Footer />
        </div>
    );
}