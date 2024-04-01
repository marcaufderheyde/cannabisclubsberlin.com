import Burger from '@/app/ui/Navigation/burger';

export default function HamburgerButton({ handleClick }) {
    return (
        <div
            onClick={() => handleClick()}
            className='py-3 px-3 backdrop-blur-xl background-white rounded-[2rem] bg-[rgba(255,255,255,0.11)]'
        >
            <Burger color={'white'} />
        </div>
    );
}
