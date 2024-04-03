import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head'

export default function HeadComponent() {
    const t = useTranslations('Metadata');
    const localActive = useLocale();
    return (
        <div>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="subject" content={t("subject")}/>
                <meta name="copyright"content="cannabisclubsberlin.com"/>
                <meta name="language" content={localActive}/>
                <meta name="topic" content={t("topic")}/>
                <meta name="url" content="https://cannabisclubsberlin.com"/>
            </Head>
        </div>
    );
}