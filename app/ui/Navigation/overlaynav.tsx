'use client';

import Link from 'next/link';
import Logo from '@/app/ui/Navigation/logo';
import Close from '@/app/ui/Navigation/close';
import LocalSwitcher from './translation-switch';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LinkInfo } from './links';
import usePrevious from '@/app/Helpers/usePrevious';
import usePreventScrolling from '@/app/Helpers/usePreventScrolling';

export default function OverlayNav({
    closeOverlay,
    links,
}: {
    closeOverlay: Function;
    links: Array<LinkInfo>;
}) {
    const pathname = usePathname();
    let prevPathnameRef = usePrevious(pathname);
    const preventScroll = usePreventScrolling();

    useEffect(() => {
        const prevPathname = prevPathnameRef as string;
        if (
            prevPathname !== null &&
            pathname !== null &&
            prevPathname !== pathname
        ) {
            closeOverlay();
            prevPathnameRef = pathname;
        }
    }, [pathname]);

    return (
        <div className="fixed bg-[rgba(255,255,255,0.30)] z-10 min-w-full min-h-full backdrop-blur-md top-0 left-0 flex flex-col justify-start items-center">
            <div
                onClick={(e) => {
                    e.stopPropagation(); // Stop the click event from propagating to parent
                }}
                className="bg-white rounded-[2rem] flex flex-col z-20 w-[90%] my-3 py-8 px-8 shadow-md"
            >
                <div className="flex flex-row justify-between items-center text-[#B6CF54]">
                    <Logo onClick={closeOverlay} />
                    <div
                        data-testid="close-button"
                        //onClick={() => closeOverlay()}
                        onClick={(e) => e.stopPropagation()}
                        className="px-4"
                    >
                        <Close color={'#828282'} />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start my-10 font-bold text-[1.6rem] text-[rgba(130,130,130,0.6)]">
                    {links.map((link: LinkInfo) => (
                        <Link
                            key={'mobile_' + link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (
                                    !(pathname as string).includes(
                                        link.href as string
                                    )
                                ) {
                                    closeOverlay();
                                } else {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }
                            }}
                            className="min-w-full py-2"
                        >
                            {link.name as String}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-row justify-end items-center text-[#828282]">
                    <LocalSwitcher />
                </div>
            </div>
        </div>
    );
}
