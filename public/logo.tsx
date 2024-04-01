import Link from 'next/link';

export default function Logo() {
    return (
        <Link href='/'>
            <div className='font-bold text-xl'>
                <p>Cannabis</p>
                <p>Clubs</p>
                <p>Berlin</p>
            </div>
        </Link>
    );
}
