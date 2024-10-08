import ContactContent from './contact-content';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import ClubsTile from '@/public/clubs-tile.png';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async () => {
    const t = await getTranslations('Metadata');
    return {
        title: t('contact_title'),
        description: t('contact_description'),
        keywords: t('contact_keywords'),
    };
};

export default function About({
    params: { locale },
}: {
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    return (
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full overflow-auto pt-12 overflow-visible">
            <ContactContent />
            <div className="w-2/3">
                <div className="absolute overflow-hidden w-full h-full left-0 top-0 z-[-1]">
                    <div className="relative w-full h-full">
                        <Image
                            className="hidden xl:block xl:absolute w-[37vw] bottom-[-350px] right-[-10vw] transform lg:rotate-[-26deg]"
                            src={ClubsTile}
                            alt="Picture of various logos from different cannabis social clubs."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
