'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Close from '@/app/components/Close/Close';
import Logo from '@/app/components/Logo/Logo';
import { LinkInfo } from '@/app/components/Navbar/Links';
import usePreventScrolling from '@/app/components/OverlayNav/helpers/usePreventScrolling';
import usePrevious from '@/app/components/OverlayNav/helpers/usePrevious';
import LocalSwitcher from '@/app/components/TranslationSwitch/TranslationSwitch';

export default function OverlayNav({
    closeOverlay,
    links,
}: {
    closeOverlay: Function;
    links: Array<LinkInfo>;
}) {
    const pathname = usePathname();
    let prevPathnameRef = usePrevious(pathname);

    useEffect(() => {
        const prevPathname = prevPathnameRef!;
        if (prevPathname !== null && pathname !== null) {
            if (prevPathname !== pathname) {
                closeOverlay();
                prevPathnameRef! = pathname;
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
