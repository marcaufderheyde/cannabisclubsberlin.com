'use client';
import Image from 'next/image';
import Caret from '@/app/ui/Navigation/caret';

export default function TranslationSwitch() {
    const selected_langauge = 'EN'; // Here we would put a loader for global context

    return (
        <div className='bg-white text-[#B0B0B0] min-h-9 min-w-20 rounded-full flex justify-center items-center gap-2 cursor-pointer'>
            <p>{selected_langauge}</p>
            <Caret color='#B0B0B0'></Caret>
        </div>
    );
}
