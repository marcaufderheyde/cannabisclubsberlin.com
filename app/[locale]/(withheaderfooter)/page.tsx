'use client';
import HomeContent from '../../components/Home/home-content';
import Background from '../../components/Home/background';

export default function IndexPage() {
    return (
        <>
            <Background />
            <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center">
                <HomeContent />
            </div>
        </>
    );
}
