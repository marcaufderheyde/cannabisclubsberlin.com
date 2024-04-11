import Link from 'next/link';
import LinkInfo from '@/app/ui/Navigation/linkinfo';
import { usePathname } from 'next/navigation';
import isPathNameHome from '@/app/helpers/isPathnameHome';

export default function Links({ links }: { links: Array<LinkInfo> }) {
    const pathname = usePathname();
    const currentPageStyling = 'text-[#E3E71F] font-bold text-xl';
    const defaultLinkStyling = 'font-normal text-xl';
    const isHomePage = isPathNameHome(pathname);

    return (
        <div className='flex flex-row justify-evenly flex-grow'>
            {links.map((link: LinkInfo) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={
                            link.href.toString().includes(pathname) &&
                            !isHomePage
                                ? currentPageStyling
                                : defaultLinkStyling
                        }
                    >
                        {link.name as String}
                    </Link>
                );
            })}
        </div>
    );
}
