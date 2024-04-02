import ActionButton from '@/app/ui/Home/actionbutton';
import { useLocale, useTranslations } from 'next-intl';


export default function TermsOfUseContent() {
    const t = useTranslations('TermsOfUsePage');
    const localActive = useLocale();
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <h1 className='font-bold text-4xl md:text-[4rem] opacity-[0.3] text-balance leading-tight'>
                {t("headline")}
            </h1>
            <p>
            {t("headline_description")}
            </p>
            <div className="h-64 overflow-y-auto">
                <h2 className='font-bold text-1xl'>1. {t("term_one_title")}</h2>
                <p>{t("term_one")}</p>
                <h2 className='font-bold text-1xl'>2. {t("term_two_title")} </h2>
                <p>{t("term_two")}</p>
                <h2 className='font-bold text-1xl'>3. {t("term_three_title")}</h2>
                <p>{t("term_three")}</p>
                <h2 className='font-bold text-1xl'>4. {t("term_four_title")} </h2>
                <p>{t("term_four")}</p>
                <h2 className='font-bold text-1xl'>5. {t("term_five_title")}</h2>
                <p>{t("term_five")}</p>
                <h2 className='font-bold text-1xl'>6. {t("term_six_title")} </h2>
                <p>{t("term_six")}</p>
            </div>
        </div>
    );
}