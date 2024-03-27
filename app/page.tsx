import Background from './ui/Home/background';
import Content from './ui/Home/content';
import Navbar from './ui/Navigation/navbar';

export default function Home() {
    return (
        <div className='flex justify-center h-full'>
            <Background />
            <div className='relative z-[1] flex justify-center max-w-[1080px] w-full'>
                <main className='max-w-[1080px] w-full'>
                    <Navbar />
                    <div className='flex flex-row w-full h-[75%] justify-between items-center'>
                        <Content />
                        <div className='w-2/3'></div>
                    </div>
                </main>
            </div>
        </div>
    );
}
