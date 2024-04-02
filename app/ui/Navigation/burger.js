import React from 'react';

export default function Burger({ color }) {
    return (
        <svg
            width='27'
            height='14'
            viewBox='0 0 27 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d='M0 1H26.5' stroke={color} strokeWidth='2' />
            <path d='M0 7H26.5' stroke={color} strokeWidth='2' />
            <path d='M0 13H26.5' stroke={color} strokeWidth='2' />
        </svg>
    );
}
