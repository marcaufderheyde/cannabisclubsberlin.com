'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useTransition } from 'react';

export default function LocalSwitcher() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const localeActive = useLocale();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const removeFirstDirectoryFromPathname = (path: string) => {
        return path.replace(/^\/[^\/]+/, '');
    };

    const createPageURL = (locale: string) => {
        const params = new URLSearchParams(searchParams);
        const pathnameWithoutCurrentLocale =
            removeFirstDirectoryFromPathname(pathname);
        return `/${locale}${pathnameWithoutCurrentLocale}?${params.toString()}`;
    };

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            const url = createPageURL(nextLocale);
            router.replace(url);
        });
    };
    return (
        <label className='border-2 rounded'>
            <p className='sr-only'>change language</p>
            <select
                defaultValue={localeActive}
                className='bg-transparent py-2'
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value='en'>English</option>
                <option value='de'>German</option>
            </select>
        </label>
    );
}
