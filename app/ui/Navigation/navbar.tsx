'use client';
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
        {
            name: t('harm_reduction_title'),
            href: `/${localActive}/harmreduction`,
        },
        { name: t('law_title'), href: `/${localActive}/law` },
        { name: t('contact_title'), href: `/${localActive}/contact` },
        { name: t('about_title'), href: `/${localActive}/about` },
        { name: t('harm_reduction_title'), href: `/${localActive}/harmreduction` },
    ];

    return (
        <div className='text-white absolute top-0 left-0 z-10 w-full h-[var(--navbar-height)]'>
            <div className='flex flex-row items-center justify-center py-4 relative max-w-[var(--layout-width)] px-[var(--layout-x-padding)] mx-auto'>
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
