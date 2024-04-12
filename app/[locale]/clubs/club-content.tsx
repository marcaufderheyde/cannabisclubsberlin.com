"use client"
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation'
import { pullClubsListContent } from './clubsListContent';
import Image from 'next/image';
import dynamic from 'next/dynamic';

export default function ClubContent() {
    const ClubOpenStreetMap = dynamic(() => import('@/app/Components/ClubOpenStreetMap'), {
        ssr: false,
    })
    const pathname = usePathname().split("/")[3];
    const club = pullClubsListContent().find((club) => club.slug === pathname);
    const t = useTranslations('ClubsPage');
    const localActive = useLocale();
    if(club) {
        club.prices = t(`${club.slug}.prices`);
        club.location = t(`${club.slug}.location`);
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
        club.harm_reduction = t(`${club.slug}.harm_reduction`);

        return (
            <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
                <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                    {club.name}
                </h1>
                <div>
                <Image src={club.imageUrl} alt={club.name + ' Club Picture'} width={300} height={300}/>

                </div>                        
                <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("price_title")}</h2>
                <p>
                    {club.prices}
                </p>
                <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("description_title")}</h2>
                <p>
                    {club.description}
                </p>
                <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("offerings_title")}</h2>
                {club.offerings.split(",").map((offering, index) => (
                    <li key={index}>{offering.trim()}</li>
                ))}
                <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("harm_reduction_title")}</h2>
                <p>
                    {club.harm_reduction}
                </p>
                <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("visit_website_title")}</h2>
                <p>
                    <a href={club.clubPageUrl} target="_blank" >{club.clubPageUrl}</a>
                </p>
                <h2 className='font-bold text-4xl md:text-[2rem] opacity-[0.3] text-balance leading-tight'>{t("location_title")}</h2>
                <p>
                    {club.location}
                </p>
                <ClubOpenStreetMap club={club}/>
                <br/>
            </div>
        );
    }
}