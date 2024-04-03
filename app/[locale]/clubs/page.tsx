import Background from '@/app/ui/Home/background';
import ClubsContent from './clubs-content';
import ClubsList from './club-list';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Clubs({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <div className='flex flex-col md:flex-col w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 md:pl-[YourNavbarWidth]'>
            <ClubsContent />
            <ClubsList />
        </div>
    );
}
