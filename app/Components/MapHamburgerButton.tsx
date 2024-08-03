import Burger from '@/app/ui/Navigation/burger';
import isPathnameHome from '@/app/helpers/isPathnameHome';
import { usePathname } from 'next/navigation';

export default function MapHamburgerButton({
    showClubList,
}: {
    showClubList: Function;
}) {
    const homeBurgerLineColor = 'white';
    const burgerLineColor = 'rgba(182,207,84,1)';

    return (
        <div
            onClick={() => showClubList()}
            className="absolute top-[var(--navbar-height)] z-[2005] right-0 m-2 p-2 bg-[rgba(255,255,255,0.5)]"
        >
            <Burger color={homeBurgerLineColor} />
        </div>
    );
}