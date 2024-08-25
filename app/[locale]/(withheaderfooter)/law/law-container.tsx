import GradientText from '@/app/Components/GradientText/GradientText';
import { ComponentType } from 'react';

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
        gridTemplateRows: 'auto',
        maxHeight: '500px',
        alignItems: 'Center',
    };

    return (
        <div style={gridParentStyle} className='my-7'>
            <GradientText className='col-start-1 col-end-5 row-start-1 row-end-2'>
                <h1 className='text-[1.5rem] md:text-[2.5rem] font-medium align-end'>
                    {title}
                </h1>
            </GradientText>
            <p className='text-[1rem] my-5 md:text-[1.5rem] col-start-1 col-end-5 md:col-end-4 row-start-2 row-end-3 self-start'>
                {text}
            </p>

            <SvgImage
                className='max-w-[100%] h-[90px] md:h-[176px] col-start-3 col-end-5 row-start-3 row-end-4 justify-self-center self-start'
                color='#B6CF54'
            ></SvgImage>
        </div>
    );
}
