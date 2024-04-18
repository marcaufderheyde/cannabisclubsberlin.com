import ClubContent from '../club-content';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { pullClubsListContent } from '../clubsListContent';

export const generateMetadata = async () => {
    const club = pullClubsListContent().find(
        (club) => club.slug === '420-club-berlin'
    );
    const t = await getTranslations('ClubsPage');
    if (club) {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);

        return {
            title: club.name,
            description: club.description,
            keywords: club.offerings,
        };
    }
};

export default function Clubs({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <div className='flex flex-col md:flex-col w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 md:pl-[YourNavbarWidth]'>
            <ClubContent />
        </div>
    );
}
