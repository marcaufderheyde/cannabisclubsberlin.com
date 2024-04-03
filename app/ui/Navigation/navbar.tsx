"use client"
import Logo from '@/app/ui/Navigation/logo';
import Links from '@/app/ui/Navigation/links';
import TranslationSwitch from './translation-switch';
import { useLocale, useTranslations } from 'next-intl';
import LinkInfo from '@/app/ui/Navigation/linkinfo';
import MobileNav from '@/app/ui/Navigation/mobilenav';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const localActive = useLocale();

    const links: Array<LinkInfo> = [
        { name: t('clubs_title'), href: `/${localActive}/clubs` },
        { name: t('law_title'), href: `/${localActive}/law` },
        { name: t('contact_title'), href: `/${localActive}/contact` },
        { name: t('about_title'), href: `/${localActive}/about` },
    ];

    return (
        <div className='text-white absolute top-0 left-0 z-10 w-full h-[var(--navbar-height)]'>
            <div className='flex flex-row items-center justify-center py-4 gap-20 relative max-w-[var(--layout-width)] px-[var(--layout-x-padding)] mx-auto'>
                <Logo />
                <div className='hidden md:flex md:flex-row items-center w-full justify-between'>
                    <Links links={links} />
                    <TranslationSwitch />
                </div>
                <div className='flex flex-row items-center w-full justify-end md:hidden'>
                    <MobileNav links={links} />
                </div>
            </div>
        </div>
    );
}
