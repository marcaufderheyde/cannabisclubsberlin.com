import type { Metadata } from 'next';
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";
import { Inter } from 'next/font/google';
import '../globals.css';
import Footer from '../ui/Footer/footer';
import Background from '../ui/Home/background';
import HeadComponent from '@/app/Components/HeadComponent';
import Navbar from '../ui/Navigation/navbar';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
    title: 'Cannabis Clubs Berlin',
    description:
        'CannabisClubsBerlin.com is your premier source for insights into cannabis clubs in Berlin, offering comprehensive reviews and information to guide the Berlin population through the myriad of cannabis options available in the city. Our mission is to educate and inform users about the vibrant cannabis culture in Berlin and to navigate the local regulations regarding cannabis use and club memberships.Your number one spot for all cannabis related information in Berlin, Germany!',
    keywords:
        'cannabis, berlin, weed, legal weed, kannabis, berlin weed, cannabis berlin, cannabis clubs, cannabis clubs berlin',
};

//function to generate the routes for all the locales
export async function generateStaticParams() {
    return ['en', 'de'].map((locale) => ({ locale }))
}

export default function LocaleLayout({
    children,
    params : {locale}
}: Readonly<{
    children: React.ReactNode;
    params: {locale : string}
}>) {
    unstable_setRequestLocale(locale);
    const messages = useMessages();
    return (
        <div>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
              <div className='bg-white flex justify-center z-[1] min-h-[100vh] h-full mb-[var(--footer-height)] shadow-lg '>
                  <Background />
                  <HeadComponent />
                  <div className='z-[2] px-[var(--layout-x-padding)] h-full  max-w-[var(--layout-width)] w-full my-auto py-[var(--navbar-height)] md:py-0 pb-10 '>
                      {children}
                  </div>
              </div>
              <Footer />
          </NextIntlClientProvider>
        </div>
    );
}
