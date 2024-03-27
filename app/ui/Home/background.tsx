'use client';

import useWindowSize from '@/app/helpers/useWindowSize';
import React, { useRef, useEffect } from 'react';

export default function Background() {
    const windowSize = useWindowSize();
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx: any = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(
            0,
            0,
            600,
            canvas.width - 100,
            100,
            600
        );
        gradient.addColorStop(0, '#E3E71F');
        gradient.addColorStop(1, '#B6CF54');

        ctx.beginPath();
        ctx.moveTo(0, 600);
        ctx.bezierCurveTo(
            500,
            500,
            canvas.width - 300,
            300,
            canvas.width * 1.1,
            -1
        );
        ctx.lineTo(0, -1);
        ctx.lineTo(0, 600);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [windowSize]);

    return (
        <div className='absolute w-full'>
            <canvas
                ref={canvasRef}
                width={windowSize.width}
                height={600}
                className=''
            ></canvas>
        </div>
    );
}
