import React from 'react';

export default function GradientText({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <div>
            {React.Children.map(children, (child, index) => {
                return (
                    <div className='relative'>
                        {child}
                        <div className='w-[6rem] md:w-[8rem] lg:w-[12rem] h-[1.625em] bg-gradient-to-r from-[#B6CF54] to-white absolute bottom-[-0.313em]  lg:bottom-[-0.3em] z-[-1] text-inherit'></div>
                    </div>
                );
            })}
        </div>
    );
}
