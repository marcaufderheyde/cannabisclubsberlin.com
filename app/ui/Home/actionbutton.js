import Link from 'next/link';
import Triangle from '@/app/ui/Home/triangle';

export default function ActionButton({
    href,
    textColor,
    backgroundColor,
    children,
}) {
    return (
        <Link
            href={href}
            className={
                'py-2 px-4 md:py-3 md:px-7 flex flex-row justify-center rounded-3xl cursor-pointer items-center gap-3'
            }
            style={{ color: textColor, backgroundColor: backgroundColor }}
        >
            {children}
            <Triangle color={textColor} />
        </Link>
    );
}
