import React from 'react';

export default function Triangle({ color, toggleRotate, className='' }) {
    return (
        <svg
            className={className + ' ' + (toggleRotate ? 'rotate-180' : '')}
            width='12'
            height='14'
            viewBox='0 0 12 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M0.5 0.937822L11 7L0.5 13.0622L0.5 0.937822Z'
                fill={color}
                stroke={color}
            />
        </svg>
    );
}
