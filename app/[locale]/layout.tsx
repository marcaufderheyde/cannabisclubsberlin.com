import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Footer from '../ui/Footer/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cannabis Clubs Berlin',
    description: 'CannabisClubsBerlin.com is your premier source for insights into cannabis clubs in Berlin, offering comprehensive reviews and information to guide the Berlin population through the myriad of cannabis options available in the city. Our mission is to educate and inform users about the vibrant cannabis culture in Berlin and to navigate the local regulations regarding cannabis use and club memberships.Your number one spot for all cannabis related information in Berlin, Germany!',
    keywords: "cannabis, berlin, weed, legal weed, kannabis, berlin weed, cannabis berlin, cannabis clubs, cannabis clubs berlin",
    };

export default function LocaleLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    return (
        <html lang={locale}>
            <body className={inter.className}>
                <div className='w-full'>
                    <div className='bg-white min-h-[100vh] w-full mb-[150px] relative shadow-xl'>
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
