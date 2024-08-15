'use client';

import useWindowSize from '@/app/Helpers/useWindowSize';
import React, { useRef, useEffect } from 'react';

export default function Background() {
    const windowSize = useWindowSize();
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const defaultSize = { width: 2560, height: 600 };
    const aspect_ratio = (current_width: any) =>
        (current_width / defaultSize.width) * defaultSize.height;

    useEffect(() => {
        const current_width = windowSize.width;
        const current_height = aspect_ratio(current_width);
        const bottomLeftArcPoint = { x: 0, y: current_height };
        const topRightArcPoint = { x: 4420, y: -100 };
        const canvas = canvasRef.current;
        const ctx: any = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(
            0,
            0,
            900,
            canvas.width - 100,
            100,
            600
        );
        gradient.addColorStop(0, '#E3E71F');
        gradient.addColorStop(1, '#B6CF54');

        ctx.beginPath();
        ctx.moveTo(bottomLeftArcPoint.x, bottomLeftArcPoint.y);
        ctx.bezierCurveTo(2000, 400, canvas.width - 500, 50, 4220, -100);
        ctx.lineTo(topRightArcPoint.x, topRightArcPoint.y);
        ctx.lineTo(bottomLeftArcPoint.x, -100);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [windowSize]);

    return (
        <div className="absolute top-0 left-0 w-full overflow-hidden z-[-1]">
            <canvas
                ref={canvasRef}
                width={windowSize.width}
                height={600}
            ></canvas>
        </div>
    );
}
