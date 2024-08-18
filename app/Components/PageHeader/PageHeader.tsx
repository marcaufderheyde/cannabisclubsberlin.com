import GradientText from '@/app/components/GradientText/GradientText';

export default function PageHeader({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <GradientText>
            <h1 className="text-black font-bold text-4xl md:text-[4rem] text-balance leading-tight">
                {children}
            </h1>
        </GradientText>
    );
}
