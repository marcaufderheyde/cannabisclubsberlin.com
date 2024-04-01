import Logo from '@/app/ui/Navigation/logo';
import Links from '@/app/ui/Navigation/links';
import TranslationSwitch from './translation-switch';

export default function Navbar() {
    return (
        <div className='text-white relative z-10 flex flex-row items-center justify-start my-4 gap-20'>
            <Logo />
            <div className='hidden md:flex md:flex-row items-center w-full justify-between'>
                <Links />
                <TranslationSwitch />
            </div>
        </div>
    );
}
