'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState<boolean>(false);
    const t = useTranslations('CookieBanner');

    useEffect(() => {
        const isAccepted = localStorage.getItem('cookiesAccepted');
        setShowBanner(!isAccepted);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="cookie-banner">
            <p>{t('description')}</p>
            <button onClick={acceptCookies}>{t('accept_button')}</button>
        </div>
    );
}
