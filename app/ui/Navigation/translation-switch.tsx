'use client';

import DropdownContent from '@/app/Components/DropdownContent';
import DropdownTrigger from '@/app/Components/DropdownTrigger';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState, useTransition } from 'react';

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

    const changeLocaleDesktop = (nextLocale: string) => {
        startTransition(() => {
            const url = createPageURL(nextLocale);
            router.replace(url);
        });
    };

    const changeLocaleMobile = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            const url = createPageURL(nextLocale);
            router.replace(url);
        });
    };

    const [showDropdownContent, setShowDropdownContent] = useState(false);

    const dropdownTrigger = (
        <DropdownTrigger handleClick={() => {
            showDropdownContent ? setShowDropdownContent(false) : setShowDropdownContent(true);
        }} />
    );
    const dropdownContent = (
        <DropdownContent handleClickAndChangeLanguage={(nextLocale: string) => {
            setShowDropdownContent(false);
            changeLocaleDesktop(nextLocale);
        }
        }
        />
    );
    return (
        <div>
            {/* Desktop */}
            <div className="sm:visible invisible relative top-0">
                {dropdownTrigger}
                {showDropdownContent && (dropdownContent)}
            </div>
            {/* Mobile: can replace invisible with hidden and flex*/}
            <div className="sm:invisible visible relative">
                <label className='border-2 rounded'>
                    <p className='sr-only'>change language</p>
                    <select
                        defaultValue={localeActive}
                        className='py-2'
                        onChange={changeLocaleMobile}
                        disabled={isPending}
                    >
                        <option value='en'>English (🇺🇸)</option>
                        <option value='de'>Deutsch (🇩🇪)</option>
                    </select>
                </label>
            </div>
        </div>

    );
}
