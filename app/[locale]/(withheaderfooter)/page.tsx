'use client';
import Background from '@/app/components/Home/Background';
import HomeContent from '../../components/Home/Home-content';
import { generateSlug } from '@/app/helpers/clubsListContent';

export default function IndexPage() {
    console.log(generateSlug('Power-Flower Cannabis Club e.V.'));
    return (
        <>
            <Background />
            <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center">
                <HomeContent />
            </div>
        </>
    );
}
