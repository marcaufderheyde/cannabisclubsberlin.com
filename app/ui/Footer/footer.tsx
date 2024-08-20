'use client';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const footerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    backgroundImage: 'linear-gradient(180deg, #E3E71F 0%, #B6CF54 100%)',
    textAlign: 'center',
    paddingTop: '100vh',
    paddingBottom: '1.5em',
    display: 'inline',
    marginTop: '100vh',
    color: 'white',
    width: '100%',
    zIndex: -1,
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const localActive = useLocale();
    const t = useTranslations('Footer');

    return (
        <div style={footerStyle}>
            <div className='text-center py-4'>
                <Link href={`/${localActive}/imprint`}>{t('imprint')}</Link>
                <span> | </span>
                <Link href={`/${localActive}/termsofuse`}>
                    {t('terms_of_use')}
                </Link>
                <p>
                    © {currentYear} CannabisClubsBerlin.com. All rights
                    reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
