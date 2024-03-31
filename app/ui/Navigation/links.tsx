import Link from 'next/link';
const links = [
    { name: 'Clubs', href: '/clubs' },
    { name: 'About', href: '/about'},
    { name: 'Law', href: '/law' },
    { name: 'Contact', href: '/contact' },
];

export default function Links() {
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
