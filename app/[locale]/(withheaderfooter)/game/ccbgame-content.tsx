'use client';
import { useLocale, useTranslations } from 'next-intl';
import PageHeader from '@/app/Components/PageHeader';
import dynamic from 'next/dynamic';

// Dynamically import the game with no SSR
const BerlinCannabisAdventure = dynamic(
    () => import('@/app/Components/BerlinCannabisAdventure'),
    { ssr: false }
);

export default function CCBGame() {
    const t = useTranslations('ContactPage');
    const localActive = useLocale();
    return (
        <div className="flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16 w-full">
            <BerlinCannabisAdventure />;
        </div>
    );
}
