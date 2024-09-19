'use client';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Logo({ onClick }: { onClick?: Function }) {
    const localActive = useLocale();
    const pathname = usePathname();
    const home = `/${localActive}`;

    const handleClick: Function = onClick
        ? () => {
              onClick();
          }
        : () => {};

    return (
        <Link onClick={() => handleClick()} href={home}>
            <div className="font-bold text-sm md:text-xl">
                <p>Cannabis</p>
                <p>Clubs</p>
                <p>Berlin</p>
            </div>
        </Link>
    );
}
