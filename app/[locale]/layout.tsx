import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import {
    NextIntlClientProvider,
    useMessages,
    useTranslations,
} from 'next-intl';
import { Inter } from 'next/font/google';
import '../globals.css';
import Footer from '../ui/Footer/footer';
import Background from '../ui/Home/background';
import Navbar from '../ui/Navigation/navbar';
import CookieBanner from '../Components/CookieBanner';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import AgeVerification from '../Components/AgeVerification';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cannabis Clubs Berlin',
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
                <Navbar />
                <div className='bg-white flex justify-center z-[1] min-h-[100vh] h-full mb-[var(--footer-height)] shadow-lg '>
                    <Background />
                    <div className='z-[2] px-[var(--layout-x-padding)] h-full  max-w-[var(--layout-width)] w-full my-auto py-[var(--navbar-height)] pb-10 '>
                        {children}
                    </div>
                </div>
                <AgeVerification />
                <CookieBanner />
                <Footer />
            </NextIntlClientProvider>
        </div>
    );
}
