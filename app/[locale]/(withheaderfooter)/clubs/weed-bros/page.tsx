import ClubContent from '../club-content';
import { setRequestLocale } from 'next-intl/server';
import { getClubMetadata } from '../../../../helpers/getClubMetadata';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}) => {
    const { locale } = await params;
    setRequestLocale(locale);
    return await getClubMetadata('weed-bros');
};

export default async function Clubs({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-col w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 md:pl-[YourNavbarWidth]">
            <ClubContent />
        </div>
    );
}
