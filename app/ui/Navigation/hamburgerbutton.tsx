import Burger from '@/app/ui/Navigation/burger';
import isPathnameHome from '@/app/helpers/isPathnameHome';
import { usePathname } from 'next/navigation';

export default function HamburgerButton({
    showOverlay,
}: {
    showOverlay: Function;
}) {
    const pathname = usePathname();
    const homeBurgerLineColor = 'white';
    const burgerLineColor = 'rgba(182,207,84,1)';

    return (
        <div
            aria-label="hamburger button"
            onClick={() => showOverlay()}
            className="py-3 px-3 backdrop-blur-xl rounded-[2rem] bg-[rgba(255,255,255,0.11)]"
        >
            <Burger
                color={
                    // @ts-ignore
                    isPathnameHome(pathname)
                        ? homeBurgerLineColor
                        : burgerLineColor
                }
            />
        </div>
    );
}
