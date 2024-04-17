import ActionButton from '@/app/ui/Home/actionbutton';

export default function HarmReductionCard({
    title,
    description,
    href,
    actionButtonText,
    className,
}: {
    title: string;
    description: string;
    href: string;
    actionButtonText: string;
    className?: string;
}) {
    const cardGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        gridTemplateRows: '1fr 2fr 0.5fr',
        gridAutoFlow: 'row',
    };

    return (
        <div
            style={cardGridStyle}
            className={
                className + '  p-[2.8em] z-1 justify-items-start items-center'
            }
        >
            <h2 className='font-bold text-4xl md:text-[3.6rem]  text-balance leading-tight col-start-1 col-end-4 row-start-1 row-end-2'>
                {title}
            </h2>
            <p className='text-[1.25rem] font-normal  col-start-1 col-end-3 row-start-2 row-end-3'>
                {description}
            </p>
            <ActionButton
                backgroundColor={'#B6CF54'}
                textColor={'#ffffff'}
                href={href}
                externalLink={true}
                className='font-semibold col-start-3 col-end-4 row-start-3 row-end-4'
            >
                {actionButtonText}
            </ActionButton>
        </div>
    );
}
