import Link from 'next/link';
import LinkInfo from '@/app/ui/Navigation/linkinfo';

export default function Links({ links }: { links: Array<LinkInfo> }) {
    return (
        <div className='flex flex-row justify-between flex-grow'>
            {links.map((link: LinkInfo) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='font-normal text-xl'
                    >
                        {link.name as String}
                    </Link>
                );
            })}
        </div>
    );
}
