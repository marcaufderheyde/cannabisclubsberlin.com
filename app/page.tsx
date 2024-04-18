import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: {
        absolute: 'Home | Cannabis Clubs Berlin',
    },
};

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
    redirect('/de');
}
