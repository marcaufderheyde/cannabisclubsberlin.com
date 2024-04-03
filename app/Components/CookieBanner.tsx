'use client';
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
    const [showBanner, setShowBanner] = useState<boolean>(false);

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
        <div className='cookie-banner'>
            <p>
                We use cookies to improve your experience on our site. By
                continuing to use our site, you accept our use of cookies.
            </p>
            <button onClick={acceptCookies}>Accept</button>
        </div>
    );
};

export default CookieBanner;
