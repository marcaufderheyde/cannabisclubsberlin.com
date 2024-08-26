'use client';
import Background from '@/app/components/Home/Background';
import HomeContent from '../../components/Home/Home-content';

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
