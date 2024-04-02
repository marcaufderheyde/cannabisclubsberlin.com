import Background from '@/app/ui/Home/background';
import ClubsContent from './clubs-content';
import Navbar from '@/app/ui/Navigation/navbar';
import Footer from '../../ui/Footer/footer';
import HeadComponent from '@/app/Components/HeadComponent';
import ClubsList from './club-list';

export default function Clubs() {
    return (
        <div className='flex flex-col md:flex-col w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 md:pl-[YourNavbarWidth]'>
            <ClubsContent />
            <ClubsList />
        </div>
    );
}
