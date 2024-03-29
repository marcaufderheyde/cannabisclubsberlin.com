import Background from './ui/Home/background';
import Content from './ui/Home/content';
import Navbar from './ui/Navigation/navbar';

export default function Home() {
    return (
        <div className='flex justify-center min-w-full min-h-full'>
            <Background />
            <div className='absolute z-[1] flex flex-col justify-start w-full max-w-[1080px] px-6 h-full'>
                <Navbar />
                <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
                    <Content />
                    <div className='w-2/3'></div>
                </div>
            </div>
        </div>
    );
}
