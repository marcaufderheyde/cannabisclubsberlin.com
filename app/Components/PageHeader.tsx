import GradientText from '@/app/Components/GradientText';

export default function PageHeader({
    text,
    className,
}: {
    readonly text: string;
    readonly className: string;
}) {
    return (
        <GradientText className={className}>
            <h1 className={'text-black font-bold text-4xl md:text-[4rem]'}>
                {text}
            </h1>
        </GradientText>
    );
}
