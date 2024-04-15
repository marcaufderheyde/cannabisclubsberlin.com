import GradientText from '@/app/Components/GradientText';
import { ComponentType, ReactNode } from 'react';

export default function LawContainer({
    title,
    text,
    SvgImage,
}: {
    title: string;
    text: string;
    SvgImage: ComponentType<any>;
}) {
    const gridParentStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        maxHeight: '500px',
        alignItems: 'Center',
    };

    return (
        <div style={gridParentStyle}>
            <GradientText className=' col-start-1 col-end-4 row-start-1 row-end-2'>
                <h1 className='text-[3rem] font-medium'>{title}</h1>
            </GradientText>
            <p className='text-[1.5rem] col-start-1 col-end-4 row-start-2 row-end-3 self-start'>
                {text}
            </p>

            <SvgImage
                className='w-[176px] h-[176px] col-start-3 col-end-5 row-start-3 row-end-4 justify-self-center self-start'
                color='black'
            ></SvgImage>
        </div>
    );
}
