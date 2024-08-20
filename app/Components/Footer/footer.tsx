'use client';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const footerStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(180deg, #E3E71F 0%, #B6CF54 100%)',
    textAlign: 'center',
    color: 'white',
    padding: '1.5em 0',
    transition: 'opacity 0.3s ease-in-out',
    paddingTop: '5vh',
};

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const currentYear = new Date().getFullYear();
    const localActive = useLocale();
    const t = useTranslations('Footer');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Show footer when scrolled near the bottom
            setIsVisible(scrollPosition > documentHeight - windowHeight - 200);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial scroll position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100vh',
                    backgroundImage:
                        'linear-gradient(180deg, #E3E71F 0%, #b8d04c 100%)',
                    opacity: isVisible ? 1 : 0,
                    visibility: isVisible ? 'visible' : 'hidden',
                    transition:
                        'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
                    zIndex: 9,
                    pointerEvents: 'none', // Ensures this div doesn't interfere with interactions
                }}
            />
            <footer
                aria-label="footer"
                style={{
                    ...footerStyle,
                    opacity: isVisible ? 1 : 0,
                    visibility: isVisible ? 'visible' : 'hidden',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                <div className="text-center">
                    <Link
                        href={`/${localActive}/imprint`}
                        className="text-white hover:underline"
                    >
                        {t('imprint')}
                    </Link>
                    <span className="mx-2">|</span>
                    <Link
                        href={`/${localActive}/termsofuse`}
                        className="text-white hover:underline"
                    >
                        {t('terms_of_use')}
                    </Link>
                    <p className="mt-2">
                        © {currentYear} CannabisClubsBerlin.com. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}
