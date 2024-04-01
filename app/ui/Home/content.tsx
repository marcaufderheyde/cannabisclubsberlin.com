import Headline from '@/app/ui/Home/headline';
import Link from 'next/link';
import ActionButton from '@/app/ui/Home/actionbutton';

export default function Content() {
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <Headline />
            <p className='md:text-[1.5rem] text-[#2E2E2E] md:max-w-[500px]'>
                Thousands of people from all backgrounds are now discovering
                Berlin’s newest culture. Let’s uncover it together.
            </p>
            <div className='flex flex-row text-lg font-semibold gap-2'>
                <ActionButton
                    backgroundColor={'#B6CF54'}
                    textColor={'#FFFFFF'}
                    href='/clubs'
                >
                    Discover
                </ActionButton>
                <ActionButton
                    backgroundColor={'#ffffff'}
                    textColor={'#8E8A8A'}
                    href='/law'
                >
                    Local Laws
                </ActionButton>
            </div>
        </div>
    );
}
