'use client';

import DropdownContent from '@/app/components/TranslationSwitch/DropdownContent';
import DropdownTrigger from '@/app/components/TranslationSwitch/DropdownTrigger';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react';

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
        if (pathname !== null) {
            const pathnameWithoutCurrentLocale =
                removeFirstDirectoryFromPathname(pathname);
            const params = searchParams?.toString();
            const url = `/${locale}${pathnameWithoutCurrentLocale}`;
            return params ? `${url}?${params}` : url;
        }
        return `/${locale}`;
    };

    const changeLocaleDesktop = (nextLocale: string) => {
        startTransition(() => {
            const url = createPageURL(nextLocale);
            if (url !== '') {
                router.replace(url);
            }
        });
    };

    const changeLocaleMobile = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            const url = createPageURL(nextLocale);
            if (url !== '') {
                router.replace(url);
            }
        });
    };

    const [showDropdownContent, setShowDropdownContent] = useState(false);

    const dropdownTriggerRef = useRef<HTMLDivElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);

    let handleCaretToggle = () => {};

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!showDropdownContent) return;

        function handleClick(event: any) {
            if (
                dropdownTriggerRef.current &&
                !dropdownTriggerRef.current.contains(event.target) &&
                dropdownContentRef.current &&
                !dropdownContentRef.current.contains(event.target)
            ) {
                setShowDropdownContent(false);
                handleCaretToggle();
            }
        }
        window.addEventListener('click', handleClick);
        // clean up
        return () => window.removeEventListener('click', handleClick);
    }, [showDropdownContent]);

    const dropdownTrigger = (
        <DropdownTrigger
            dropdownRef={dropdownTriggerRef}
            handleClick={() => {
                showDropdownContent
                    ? setShowDropdownContent(false)
                    : setShowDropdownContent(true);
            }}
            toggleCaret={(toggle: () => void) => {
                handleCaretToggle = toggle;
            }}
        />
    );

    const dropDownContent = (
        <DropdownContent
            dropdownRef={dropdownContentRef}
            handleClickAndChangeLanguage={(nextLocale: string) => {
                if (!isPending) {
                    setShowDropdownContent(false);
                    changeLocaleDesktop(nextLocale);
                }
            }}
        />
    );

    return (
        <div className="flex w-full">
            {/* Desktop */}
            <div className="lg:visible invisible relative top-0 right-0">
                {dropdownTrigger}
                {showDropdownContent && dropDownContent}
            </div>

            {/* Mobile and Tablet: Positioned at the bottom left */}
            <div className="lg:invisible visible absolute bottom-5 left-5">
                <p className="sr-only">change language</p>
                <select
                    defaultValue={localeActive}
                    className="py-2 w-full rounded-lg"
                    onChange={changeLocaleMobile}
                    disabled={isPending}
                >
                    <option value="en">🇬🇧 English</option>
                    <option value="de">🇩🇪 Deutsch</option>
                </select>
            </div>
        </div>
    );
}
