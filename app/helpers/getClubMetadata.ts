import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { getTranslations } from 'next-intl/server';

export async function getClubMetadata(clubSlug: string) {
    const club = pullClubsListContent().find((club) => club.slug === clubSlug);
    const t = await getTranslations('ClubsPage');
    if (club) {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);

        return {
            title: club.name,
            description: t(`${club.slug}.meta_description`),
            keywords: t(`${club.slug}.meta_keywords`) + ', ' + club.name,
        };
    }
}
