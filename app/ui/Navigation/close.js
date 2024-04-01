import React from 'react';

export default function Close({ color }) {
    return (
        <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M1 1L17 17'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
            <path
                d='M17 1L1 17'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
        </svg>
    );
}
