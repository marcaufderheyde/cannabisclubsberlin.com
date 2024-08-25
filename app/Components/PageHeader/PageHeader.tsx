import GradientText from '@/app/Components/GradientText/GradientText';

export default function PageHeader({
    text,
    className,
}: {
    readonly text: string;
    readonly className: string;
}) {
    return (
        <GradientText aria-label='gradient text' className={className}>
            <h1
                className={
                    'text-black font-bold text-4xl md:text-[4rem] text-balance leading-tight'
                }
            >
                {text}
            </h1>
        </GradientText>
    );
}
