import Image from 'next/image';

export default function Background() {
    return (
        <Image
            className='!h-auto '
            src='/home-background.svg'
            fill={true}
            alt='Background Image Gradient in Green'
        ></Image>
    );
}
