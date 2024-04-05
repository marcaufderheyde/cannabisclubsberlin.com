'use client';

import DropdownContent from '@/app/Components/DropdownContent';
import DropdownMenu from '@/app/Components/DropdownMenu';
import DropdownTrigger from '@/app/Components/DropdownTrigger';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState, useTransition } from 'react';

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

    const changeLocale = (nextLocale: string) => {
        startTransition(() => {
            const url = createPageURL(nextLocale);
            router.replace(url);
        });
    };
    // <label className='border-2 rounded'>
    //     <p className='sr-only'>change language</p>
    //     <select
    //         defaultValue={localeActive}
    //         className='bg-transparent py-2'
    //         onChange={onSelectChange}
    //         disabled={isPending}
    //     >
    //         <option value='en'>English</option>
    //         <option value='de'>German</option>
    //     </select>
    // </label>

    const [showDropdownContent, setShowDropdownContent] = useState(false);

    const dropdownTrigger = (
        <DropdownTrigger handleClick={() => {
            showDropdownContent ? setShowDropdownContent(false) : setShowDropdownContent(true);
        }} />
    );
    const dropdownContent = (
        <DropdownContent handleClickAndChangeLanguage={(nextLocale: string) => {
            setShowDropdownContent(false);
            changeLocale(nextLocale);
            }
        }
        />
    );
    return (
        <div className="top-0 relative">
            {dropdownTrigger}
            {showDropdownContent && (dropdownContent)}
        </div>

    );
}
