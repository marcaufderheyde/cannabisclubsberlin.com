import Logo from '@/app/ui/Navigation/logo';
import Links from '@/app/ui/Navigation/links';
import TranslationSwitch from './translation-switch';
import { useLocale, useTranslations } from 'next-intl';
import LinkInfo from '@/app/ui/Navigation/linkinfo';

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
        <div className='text-white relative z-10 flex flex-row items-center justify-start my-4 gap-20'>
            <Logo />
            <div className='hidden md:flex md:flex-row items-center w-full justify-between'>
                <Links links={links} />
                <TranslationSwitch />
            </div>
        </div>
    );
}
