import GradientText from '@/app/Components/GradientText';

export default function PageHeader({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <GradientText>
            <h1 className='text-black font-bold text-4xl md:text-[4rem] text-balance leading-tight'>
                {children}
            </h1>
        </GradientText>
    );
}
