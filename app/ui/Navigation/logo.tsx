'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function Logo({ onClick }: { onClick?: Function }) {
    const localActive = useLocale();

    const handleClick: Function = onClick ? onClick : () => {};

    return (
        <Link onClick={() => handleClick()} href={`/${localActive}`}>
            <div className='font-bold text-xl'>
                <p>Cannabis</p>
                <p>Clubs</p>
                <p>Berlin</p>
            </div>
        </Link>
    );
}
