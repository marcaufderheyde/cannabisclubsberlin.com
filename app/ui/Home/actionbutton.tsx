import Link from 'next/link';
import Triangle from '@/app/ui/Home/triangle';
import { ReactNode } from 'react';

export default function ActionButton({
    href,
    textColor,
    backgroundColor,
    children,
    externalLink = false,
    className,
}: {
    className?: string;
    externalLink?: boolean;
    children: ReactNode;
    backgroundColor: string;
    textColor: string;
    href: string;
}) {
    return !externalLink ? (
        <Link
            href={href}
            className={
                className +
                ' py-2 px-4 md:py-3 md:px-7 flex flex-row justify-center rounded-3xl cursor-pointer items-center gap-3'
            }
            style={{
                color: textColor,
                backgroundColor: backgroundColor,
                backgroundImage: backgroundColor,
            }}
        >
            {children}
            <Triangle color={textColor} toggleRotate={false} />
        </Link>
    ) : (
        <a
            href={href}
            target="_blank"
            className={
                className +
                ' py-2 px-4 md:py-3 md:px-7 flex flex-row justify-center rounded-3xl cursor-pointer items-center gap-3'
            }
            style={{
                color: textColor,
                backgroundColor: backgroundColor,
                backgroundImage: backgroundColor,
            }}
        >
            {children}
            <Triangle color={textColor} toggleRotate={false} />
        </a>
    );
}
