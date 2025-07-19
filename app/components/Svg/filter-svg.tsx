export default function FilterSVG({
    color,
    className,
}: {
    color: string;
    className?: string;
}) {
    return (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            className={className}
        >
            <title>Filter Icon</title>
            <desc>Filter funnel icon with three horizontal bars</desc>
            <g>
                {/* Top bar - widest */}
                <rect
                    x='3'
                    y='6'
                    width='18'
                    height='2'
                    rx='1'
                    fill={color}
                />
                {/* Middle bar - medium */}
                <rect
                    x='6'
                    y='11'
                    width='12'
                    height='2'
                    rx='1'
                    fill={color}
                />
                {/* Bottom bar - narrowest */}
                <rect
                    x='9'
                    y='16'
                    width='6'
                    height='2'
                    rx='1'
                    fill={color}
                />
            </g>
        </svg>
    );
} 