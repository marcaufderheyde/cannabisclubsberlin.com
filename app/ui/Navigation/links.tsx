import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Links() {
    const t = useTranslations('Navbar');
    const links = [
        { name: t('clubs_title'), href: '/clubs' },
        { name: t('law_title'), href: '/law' },
        { name: t('contact_title'), href: '/contact' },
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
