import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Footer from '../ui/Footer/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cannabis Clubs Berlin',
    description:
        'Your number one spot for all cannabis related information in Berlin, Germany!',
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
