import ActionButton from '@/app/ui/Home/actionbutton';

export default function HarmReductionCard({
    title,
    description,
    href,
    actionButtonText,
    className,
    buttonBackgroundColor,
    buttonTextColor,
}: {
    title: string;
    description: string;
    href: string;
    actionButtonText: string;
    buttonBackgroundColor?: string;
    buttonTextColor?: string;
    className?: string;
}) {
    return (
        <div
            className={
                className +
                ' grid grid-cols-subgrid grid-rows-[minmax(1fr,_2fr)_1fr_1fr] md:grid-rows-[1fr_2fr_0.5fr] p-[1.8em] lg:p-[2.8em] z-1 justify-items-start items-center drop-shadow-lg'
            }
        >
            <h2 className='font-bold text-4xl lg:text-[3.6rem] text-balance leading-tight col-start-1 col-end-5 md:col-end-4 row-start-1 row-end-2'>
                {title}
            </h2>
            <p className='lg:text-[1.25rem] font-normal  col-start-1 col-end-5 md:col-end-4 lg:col-end-3 row-start-2 row-end-3 self-start'>
                {description}
            </p>
            <ActionButton
                backgroundColor={
                    buttonBackgroundColor ? buttonBackgroundColor : '#B6CF54'
                }
                textColor={buttonTextColor ? buttonTextColor : 'white'}
                href={href}
                externalLink={true}
                className='font-semibold md:text-sm lg:text-lg font col-start-2 col-end-5 md:col-end-4 row-start-3 row-end-4 justify-self-end'
            >
                {actionButtonText}
            </ActionButton>
        </div>
    );
}
