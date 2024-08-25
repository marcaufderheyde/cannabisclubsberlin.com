'use client';
import Logo from '@/app/Components/Logo/Logo';
import Links, { LinkInfo } from '@/app/Components/Navbar/Links';
import TranslationSwitch from '@/app/Components/TranslationSwitch/TranslationSwitch';
import { useLocale, useTranslations } from 'next-intl';
import MobileNav from '@/app/Components/MobileNav/MobileNav';
import { usePathname } from 'next/navigation';
import isPathNameHome from '@/app/helpers/isPathnameHome';

type Props = {
    isOnMap: boolean;
};

export default function Navbar({ isOnMap = false }: Props) {
    const t = useTranslations('Navbar');
    const localActive = useLocale();

    const navZAxis = isOnMap ? 'z-[3000]' : 'z-10';
    const translucentBackground = isOnMap ? 'bg-white bg-opacity-85' : '';

    const links: Array<LinkInfo> = [
        { name: t('clubs_title'), href: `/${localActive}/clubs` },
        {
            name: t('harm_reduction_title'),
            href: `/${localActive}/harmreduction`,
        },
        { name: t('law_title'), href: `/${localActive}/law` },
        { name: t('contact_title'), href: `/${localActive}/contact` },
        { name: t('about_title'), href: `/${localActive}/about` },
    ];

    const pathname = usePathname();
    // @ts-ignore
    const fontColor = isPathNameHome(pathname)
        ? 'text-white'
        : 'text-[#868686]';

    return (
        <div
            role='banner'
            className={
                fontColor +
                ' absolute top-0 left-0 ' +
                navZAxis +
                ' w-[100vw] h-[var(--navbar-height-mobile)] lg:h-[var(--navbar-height)] ' +
                translucentBackground
            }
        >
            <div
                className={
                    'flex flex-row items-center justify-center h-[100%] py-1 lg:py-2 relative max-w-[var(--layout-width)] px-[var(--layout-x-padding)] mx-auto'
                }
            >
                <Logo />
                <div className='hidden lg:flex lg:flex-row items-center w-full justify-between gap-6'>
                    <Links links={links} />
                    <TranslationSwitch />
                </div>
                <div className='flex flex-row items-center w-full justify-end lg:hidden'>
                    <MobileNav links={links} />
                </div>
            </div>
        </div>
    );
}
