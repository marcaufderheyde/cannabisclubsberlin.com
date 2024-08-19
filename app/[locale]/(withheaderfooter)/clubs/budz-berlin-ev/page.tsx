import ClubContent from '../club-content';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getClubMetadata } from '@/app/helpers/getClubMetadata';

export const generateMetadata = async () => {
    return await getClubMetadata('budz-berlin-ev');
};

export default function Clubs({
    params: { locale },
}: {
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-col w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 md:pl-[YourNavbarWidth]">
            <ClubContent />
        </div>
    );
}
