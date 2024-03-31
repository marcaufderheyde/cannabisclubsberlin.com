import HeadComponent from '../Components/HeadComponent';
import Footer from '../ui/Footer/footer';
import Background from '../ui/Home/background';
import Content from '../ui/Home/content';
import Navbar from '../ui/Navigation/navbar';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
    params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {

    unstable_setRequestLocale(locale);

    // const t = useTranslations('IndexPage');

    return (
        <div className='flex justify-center min-w-full min-h-full'>
            <HeadComponent/>
            <Background />
            <div className='absolute z-[1] flex flex-col justify-start w-full max-w-[1080px] px-6 h-full'>
                <Navbar />
                <div className='flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full'>
                    <Content />
                </div>
            </div>
            <Footer/>
        </div>
    );
}
