import Image from 'next/image';

export default function Headline() {
    return (
        <div className='md:max-w-[400px]'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                Discover Berlin From New Heights.
            </h1>
        </div>
    );
}
