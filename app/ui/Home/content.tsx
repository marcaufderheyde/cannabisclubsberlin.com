import Headline from '@/app/ui/Home/headline';
import Link from 'next/link';

export default function Content() {
    return (
        <div className='flex flex-col gap-12'>
            <Headline />
            <p className='text-[1.5rem] text-[#2E2E2E] max-w-[500px]'>
                Thousands of people from all backgrounds are now discovering
                Berlin’s newest culture. Let’s uncover it together.
            </p>
            <div className='flex flex-row'>
                <Link href='/clubs'>Discover</Link>
                <Link href='/law'>Local Laws</Link>
            </div>
        </div>
    );
}
