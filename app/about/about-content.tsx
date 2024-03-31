import Headline from '@/app/ui/Home/headline';
import Link from 'next/link';
import ActionButton from '@/app/ui/Home/actionbutton';

export default function AboutContent() {
    return (
        <div className='flex flex-col gap-8 md:gap-12 md:mt-30 lg:mt-16'>
            <p className='md:text-[1.5rem] text-[#2E2E2E] md:max-w-[500px]'>
                What's this all about?
            </p>
            <p>
            CannabisClubsBerlin.com is your premier source for insights into cannabis clubs in Berlin, offering comprehensive reviews and information to guide the Berlin population through the myriad of cannabis options available in the city. Our mission is to educate and inform users about the vibrant cannabis culture in Berlin and to navigate the local regulations regarding cannabis use and club memberships.
            On this page you will find information about cannabis in Berlin, how it all works, where you can buy it, and how you can get started!
            The information provided on CannabisClubsBerlin.com aims to support, but not replace, the direct relationship between visitors and cannabis clubs or legal advisors.
            </p>
            <p>Want to find out more? Let's get you started on the laws on Cannabis in Berlin, and in Germany!</p>
            <ActionButton
                backgroundColor={'#B6CF54'}
                textColor={'#ffffff'}
                href='/laws'
            >
                Local Laws
            </ActionButton>
        </div>
    );
}