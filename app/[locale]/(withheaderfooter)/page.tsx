'use client';
import Background from '@/app/Components/Home/Background';
import HomeContent from '../../Components/Home/home-content';

export default function IndexPage() {
    return (
        <>
            <Background />
            <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center'>
                <HomeContent />
            </div>
        </>
    );
}
