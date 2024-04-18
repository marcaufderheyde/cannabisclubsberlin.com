import Clubs from './page';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export const generateMetadata = async () => {
    const t = await getTranslations('Metadata');
    return {
        title: t('clubs_title'),
    };
};

export default function ClubsLayout({
    params: { locale },
}: Readonly<{
    params: { locale: string };
}>) {
    unstable_setRequestLocale(locale);
    return (
        <Clubs
            params={{
                locale: locale,
            }}
        ></Clubs>
    );
}
