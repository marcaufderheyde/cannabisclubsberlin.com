import React from 'react';

type CaretProps = {
    color: string;
};

export default function Caret({ color }: CaretProps) {
    return (
        <svg
            data-testid="caret-svg"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M1 1L7 7L13 1" stroke={color} />
        </svg>
    );
}
