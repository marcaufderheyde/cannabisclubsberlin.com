'use client';

import Link from 'next/link';
import LinkInfo from '@/app/ui/Navigation/linkinfo';
import Logo from '@/app/ui/Navigation/logo';
import Close from '@/app/ui/Navigation/close';
import LocalSwitcher from './translation-switch';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import usePrevious from '@/app/helpers/usePrevious';
import usePreventScrolling from '@/app/helpers/usePreventScrolling';

export default function OverlayNav({
    closeOverlay,
    links,
}: {
    closeOverlay: Function;
    links: Array<LinkInfo>;
}) {
    const pathname = usePathname();
    const prevPathnameRef = usePrevious(pathname);
    const preventScroll = usePreventScrolling();

    useEffect(() => {
        const prevPathname = prevPathnameRef.current as string;
        if (prevPathname !== null && pathname !== null) {
            if (prevPathname !== pathname) {
                closeOverlay();
                prevPathnameRef.current = pathname;
            }
        }
    }, [pathname]);

    return (
        <div
            onClick={(e) => {
                closeOverlay();
            }}
            className="fixed bg-[rgba(255,255,255,0.30)] z-[2010] min-w-full min-h-full backdrop-blur-md top-0 left-0 flex flex-col justify-start items-center"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="bg-white rounded-[2rem] flex flex-col z-[2020] w-[90%] my-3 py-8 px-8 shadow-md"
            >
                <div className="flex flex-row justify-between items-center text-[#B6CF54]">
                    <Logo onClick={() => closeOverlay()} />
                    <div onClick={() => closeOverlay()} className="px-4">
                        <Close color={'#828282'} />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start my-10 font-bold text-[1.6rem] text-[rgba(130,130,130,0.6)]">
                    {links.map((link: LinkInfo) => {
                        return (
                            <Link
                                onClick={
                                    (pathname as string).includes(
                                        link.href as string
                                    )
                                        ? () => {
                                              closeOverlay();
                                          }
                                        : () => {}
                                }
                                className="min-w-full py-2"
                                key={'mobile_' + link.name}
                                href={link.href}
                            >
                                {link.name as String}
                            </Link>
                        );
                    })}
                </div>
                <div className="flex flex-row justify-end items-center text-[#828282]">
                    <LocalSwitcher />
                </div>
            </div>
        </div>
    );
}
