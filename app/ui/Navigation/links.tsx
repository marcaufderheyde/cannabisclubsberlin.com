import Link from 'next/link';
import LinkInfo from '@/app/ui/Navigation/linkinfo';
import { usePathname } from 'next/navigation';
import isPathNameHome from '@/app/helpers/isPathnameHome';

export default function Links({ links }: { links: Array<LinkInfo> }) {
    const pathname = usePathname();
    const currentPageStyling =
        'text-[#E3E71F] font-bold text-xl group transition duration-300';
    const defaultLinkStyling =
        'font-normal text-xl group transition duration-300';
    const isHomePage = isPathNameHome(pathname);

    return (
        <div className="flex flex-row justify-evenly flex-grow">
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
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-lime-500"></span>
                    </Link>
                );
            })}
        </div>
    );
}
