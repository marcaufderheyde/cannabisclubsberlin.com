import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Links() {
    const t = useTranslations('Navbar');
    const localActive = useLocale();

    const links = [
        { name: t('clubs_title'), href: `/${localActive}/clubs` },
        { name: t('law_title'), href: `/${localActive}/law` },
        { name: t('contact_title'), href: `/${localActive}/contact` },
        { name: t('about_title'), href: `/${localActive}/about` },
    ];
    return (
        <div className='flex flex-row justify-evenly gap-16'>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='font-normal text-xl'
                    >
                        {link.name}
                    </Link>
                );
            })}
        </div>
    );
}
