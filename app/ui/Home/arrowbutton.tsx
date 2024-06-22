import React from 'react';
import Triangle from '@/app/ui/Home/triangle';

type ArrowButtonProps = {
    backgroundColor: string;
    triangleColor: string;
    boxClassName?: string;
    triangleClassName?: string;
    onClickFunction: any;
    toggleRotate: boolean;
};

export default function ArrowButton({
    backgroundColor,
    triangleColor,
    boxClassName,
    triangleClassName,
    onClickFunction,
    toggleRotate,
}: ArrowButtonProps) {
    return (
        <button
            onClick={onClickFunction}
            className={boxClassName + ' ' + backgroundColor}
        >
            <Triangle
                toggleRotate={toggleRotate}
                color={triangleColor}
                className={triangleClassName}
            />
        </button>
    );
}
