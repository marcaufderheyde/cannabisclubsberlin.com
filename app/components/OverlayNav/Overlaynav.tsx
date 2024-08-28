import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Logo from '@/app/components/Logo/Logo';
import Close from '@/app/components/Close/Close';
import LocalSwitcher from '@/app/components/TranslationSwitch/TranslationSwitch';
import { usePathname } from 'next/navigation';
import { LinkInfo } from '@/app/components/Navbar/Links';
import usePrevious from '@/app/components/OverlayNav/helpers/usePrevious';
import usePreventScrolling from '@/app/components/OverlayNav/helpers/usePreventScrolling';
import Drawer from '../Drawer/Drawer';

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

    usePreventScrolling();

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
        <Drawer onClose={closeOverlay} isOpen={showOverlay}></Drawer>
        // <div
        //     className='fixed bg-[rgba(255,255,255,0.30)] z-50 min-w-full min-h-full backdrop-blur-md top-0 left-0 flex flex-col justify-start items-center'
        //     onClick={closeOverlay}
        // >
        //     <div
        //         className='bg-white rounded-[2rem] flex flex-col z-60 w-[90%] my-3 py-8 px-8 shadow-md relative'
        //         onClick={(e) => e.stopPropagation()}
        //     >
        //         <div className='flex flex-row justify-between items-center text-[#B6CF54]'>
        //             <Logo onClick={closeOverlay} />
        //             <div
        //                 data-testid='close-button'
        //                 onClick={handleCloseClick}
        //                 className='px-4 cursor-pointer z-70'
        //             >
        //                 <Close color={'#828282'} />
        //             </div>
        //         </div>
        //         <div className='flex flex-col justify-start items-start my-10 font-bold text-[1.6rem] text-[rgba(130,130,130,0.6)]'>
        //             {links.map((link: LinkInfo) => (
        //                 <Link
        //                     key={'mobile_' + link.name}
        //                     href={link.href}
        //                     onClick={(e) => handleClick(e, link.href as string)}
        //                     className='min-w-full py-2'
        //                 >
        //                     {link.name as string}
        //                 </Link>
        //             ))}
        //         </div>
        //         <div className='flex flex-row justify-end items-center text-[#828282]'>
        //             <LocalSwitcher />
        //         </div>
        //     </div>
        // </div>
    );
}
