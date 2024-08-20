import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import '@/app/globals.css';
import Navbar from '../../components/Navbar/Navbar';
import CookieBanner from '../../components/CookieBanner/CookieBanner';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import AgeVerification from '../../components/AgeVerification/AgeVerification';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import Footer from '@/app/components/Footer/Footer';

export const metadata: Metadata = {
    // ... (metadata remains unchanged)
};

export async function generateStaticParams() {
    return ['en', 'de'].map((locale) => ({ locale }));
}

export default function LocaleLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    unstable_setRequestLocale(locale);
    const messages = useMessages();
    return (
        <div className="min-h-screen relative">
            <NextIntlClientProvider messages={messages}>
                <div className="relative z-10">
                    <Navbar isOnMap={false} />
                    <div className="bg-white flex justify-center min-h-screen shadow-lg">
                        <div className="z-[2] px-[var(--layout-x-padding)] h-full max-w-[var(--layout-width)] w-full my-auto py-[var(--navbar-height)] pb-10">
                            {children}
                        </div>
                    </div>
                </div>
                <AgeVerification />
                <CookieBanner />
                <Footer />
            </NextIntlClientProvider>
            <GoogleTagManager gtmId="GTM-PBKDVXT9" />
            <Script
                id="googleTagManager"
                async
                strategy="lazyOnload"
                src="https://www.googletagmanager.com/gtag/js?id=G-7NZJ6HL34T"
            ></Script>
            <Script id="googleAnalyticsDataLayer" strategy="lazyOnload">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7NZJ6HL34T');
        `}
            </Script>
        </div>
    );
}
