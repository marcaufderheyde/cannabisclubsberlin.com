import { getTranslations } from 'next-intl/server';
import { pullClubsListContent } from './clubsListContent';

export const getClubMetadata = async (clubSlug: string) => {
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
};
