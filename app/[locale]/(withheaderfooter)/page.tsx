'use client';
import CookieBanner from '../../Components/CookieBanner';
import Content from '../../ui/Home/content';
import Background from '../../ui/Home/background';

export default function IndexPage() {
    return (
        <>
            <Background />
            <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center'>
                <Content />
            </div>
        </>
    );
}
