'use client';
import Image from 'next/image';

export default function TranslationSwitch() {
    const selected_langauge = 'EN'; // Here we would put a loader for global context

    return (
        <div className='bg-white text-[#B0B0B0] min-h-9 min-w-20 rounded-full flex justify-center items-center gap-2 cursor-pointer'>
            <p>{selected_langauge}</p>
            <Image
                src='/caret.svg'
                width={12}
                height={8}
                alt='Translation Switch Caret'
            ></Image>
        </div>
    );
}
