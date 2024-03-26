import Background from './ui/Home/background';
import Navbar from './ui/Navigation/navbar';

export default function Home() {
    return (
        <div className='flex justify-center background h-full'>
            <main className='flex flex-col w-10/12'>
                <Navbar />
            </main>
        </div>
    );
}
