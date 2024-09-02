import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Logo from '@/app/components/Logo/Logo';
import LocalSwitcher from '@/app/components/TranslationSwitch/TranslationSwitch';
import { usePathname } from 'next/navigation';
import { LinkInfo } from '@/app/components/Navbar/Links';
import usePrevious from '@/app/components/OverlayNav/helpers/usePrevious';
import usePreventScrolling from '@/app/components/OverlayNav/helpers/usePreventScrolling';
import Drawer from '../Drawer/Drawer';
import isPathNameHome from '@/app/helpers/isPathnameHome';

export default function OverlayNav({
    closeOverlay,
    showOverlay,
    links,
}: {
    closeOverlay: () => void;
    showOverlay: boolean;
    links: Array<LinkInfo>;
}) {
    const pathname = usePathname();
    const prevPathnameRef = usePrevious(pathname);
    const [shouldClose, setShouldClose] = useState(false);
    const isHomePage = isPathNameHome(pathname);

    usePreventScrolling(showOverlay);

    useEffect(() => {
        const prevPathname = prevPathnameRef as string;
        if (
            prevPathname !== null &&
            pathname !== null &&
            prevPathname !== pathname
        ) {
            setShouldClose(true);
        }

        return () => {
            setShouldClose(false);
        };
    }, [pathname, prevPathnameRef]);

    useEffect(() => {
        const prevPathname = prevPathnameRef as string;
        if (
            shouldClose &&
            prevPathname !== null &&
            pathname !== null &&
            prevPathname !== pathname
        ) {
            closeOverlay();
        }
    }, [shouldClose, closeOverlay, pathname, prevPathnameRef]);

    const handleClick = useCallback(
        (e: React.MouseEvent, href?: string) => {
            e.stopPropagation();
            if (href && pathname !== href) {
                setShouldClose(true);
            }
        },
        [pathname]
    );

    const handleCloseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeOverlay();
    };

    return (
        <Drawer
            onClose={closeOverlay}
            isOpen={showOverlay}
            closeButtonColor='white'
        >
            <div className='p-3 bg-gray-700 h-[100vh]'>
                <div className='flex flex-row justify-between items-center text-[#B6CF54]'>
                    <Logo onClick={closeOverlay} />
                </div>
                <div className='flex flex-col justify-start items-start my-10 font-bold text-[1.6rem] text-[rgba(130,130,130,0.6)]'>
                    {links.map((link: LinkInfo) => (
                        <Link
                            key={'mobile_' + link.name}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href as string)}
                            className={
                                (link.href.toString().includes(pathname) &&
                                !isHomePage
                                    ? `text-[#B6CF54] `
                                    : `text-white `) + ' min-w-full py-2 '
                            }
                        >
                            {link.name as string}
                        </Link>
                    ))}
                </div>
                <div className='flex flex-row justify-end items-center text-[#828282]'>
                    <LocalSwitcher />
                </div>
            </div>
        </Drawer>
    );
}
