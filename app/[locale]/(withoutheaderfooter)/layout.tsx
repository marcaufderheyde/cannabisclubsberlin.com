import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import '@/app/globals.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

export const metadata: Metadata = {
    title: {
        template: '%s | Cannabis Clubs Berlin',
        default: 'Cannabis Clubs Berlin',
    },
    description:
        'CannabisClubsBerlin.com ist deine erste Quelle für Einblicke in Cannabisclubs in Berlin und bietet umfassende Bewertungen und Informationen, um die Berliner Bevölkerung durch die unzähligen Cannabisoptionen in der Stadt zu führen. Unsere Mission ist es, dich über die lebendige Cannabis-Kultur in Berlin aufzuklären und zu informieren und dich durch die lokalen Vorschriften in Bezug auf Cannabis-Konsum und Club-Mitgliedschaften zu navigieren - deine erste Anlaufstelle für alle Cannabis-bezogenen Informationen in Berlin, Deutschland!',
    keywords:
        'cannabis, berlin, weed, legal weed, kannabis, berlin weed, cannabis berlin, cannabis clubs, cannabis clubs berlin, harm reduction, cannabis harm reduction, cannabis addiction, schadensminimierung, cannabis schadensminderung, cannabisabhängigkeit',
};

//function to generate the routes for all the locales
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
        <div>
            <NextIntlClientProvider messages={messages}>
                {children}
            </NextIntlClientProvider>
            <GoogleTagManager gtmId="GTM-PBKDVXT9" />
            <Script
                async
                strategy="lazyOnload"
                src="https://www.googletagmanager.com/gtag/js?id=G-7NZJ6HL34T"
            ></Script>
            <Script strategy="lazyOnload">
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
