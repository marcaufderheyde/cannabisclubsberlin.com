"use client"
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function Logo() {
    const localActive = useLocale();
    return (
        <Link href={`/${localActive}`}>
            <div className='font-bold text-xl'>
                <p>Cannabis</p>
                <p>Clubs</p>
                <p>Berlin</p>
            </div>
        </Link>
    );
}
