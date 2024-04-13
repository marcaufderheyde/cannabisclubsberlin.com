import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cannabis Clubs Berlin',
    description:
        'CannabisClubsBerlin.com ist deine erste Quelle für Einblicke in Cannabisclubs in Berlin und bietet umfassende Bewertungen und Informationen, um die Berliner Bevölkerung durch die unzähligen Cannabisoptionen in der Stadt zu führen. Unsere Mission ist es, dich über die lebendige Cannabis-Kultur in Berlin aufzuklären und zu informieren und dich durch die lokalen Vorschriften in Bezug auf Cannabis-Konsum und Club-Mitgliedschaften zu navigieren - deine erste Anlaufstelle für alle Cannabis-bezogenen Informationen in Berlin, Deutschland!',
    keywords:
        'cannabis, berlin, weed, legal weed, kannabis, berlin weed, cannabis berlin, cannabis clubs, cannabis clubs berlin, harm reduction, cannabis harm reduction, cannabis addiction, schadensminimierung, cannabis schadensminderung, cannabisabhängigkeit',
};

export default function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    return (
        <html lang={locale}>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
