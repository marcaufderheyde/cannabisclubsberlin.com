import Link from 'next/link';
import LinkInfo from '@/app/ui/Navigation/linkinfo';

export default function Links({ links }: { links: Array<LinkInfo> }) {
    return (
        <div className='flex flex-row justify-evenly flex-grow'>
            {links.map((link: LinkInfo) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='font-normal text-xl group transition duration-300'
                    >
                        {link.name as String}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"></span>
                    </Link>
                );
            })}
        </div>
    );
}
