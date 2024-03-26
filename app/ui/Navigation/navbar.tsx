import Logo from '@/app/ui/Navigation/logo';
import Links from '@/app/ui/Navigation/links';
import TranslationSwitch from './translation-switch';

export default function Navbar() {
    return (
        <div className='text-white relative z-10 flex flex-row items-center justify-between my-10'>
            <div className='flex flex-row items-start gap-16 items-center'>
                <Logo />
                <Links />
            </div>
            <TranslationSwitch />
        </div>
    );
}
