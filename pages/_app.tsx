// pages/_app.js

import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Component key={router.route} {...pageProps} />
        </AnimatePresence>
    );
}
