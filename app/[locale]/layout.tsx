import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cannabis Clubs Berlin',
    description:
        'Your number one spot for all cannabis related information in Berlin, Germany!',
    viewport: 'width=device-width,initial-scale=1',
};

export default function LocaleLayout({
    children,
    params: {locale}
}: Readonly<{
    children: React.ReactNode;
    params: {locale: string};
}>) {
    return (
        <html lang={locale}>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
