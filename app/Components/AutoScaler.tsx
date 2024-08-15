import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import useWindowSize from '../Helpers/useWindowSize';
import ClassNameMatcher from '../Helpers/ClassNameMatcher';

export default function AutoScaler({
    children,
    refScreenWidthInPixels,
}: {
    readonly children: ReactElement<any>;
    readonly refScreenWidthInPixels: string;
}) {
    const windowSize = useWindowSize();
    const [scaleFactor, setScaleFactor] = useState(0);

    useEffect(() => {
        const refScreenWidth = parseFloat(refScreenWidthInPixels);
        const windowWidth = windowSize.width
            ? windowSize.width
            : refScreenWidth;
        setScaleFactor(windowWidth / refScreenWidth);
    }, [windowSize]);

    const ScaledChildren = () =>
        React.Children.map(children, (child: ReactElement<any>, index: any) => {
            const childWidth = parseFloat(
                ClassNameMatcher.getCustomWidth(child.props.className)
            );

            const childHeight = parseFloat(
                ClassNameMatcher.getCustomHeight(child.props.className)
            );

            return React.cloneElement(child, {
                key: index,
                style: {
                    display: `${!scaleFactor && 'none'}`,
                    width: `${childWidth * scaleFactor}px`,
                    height: `${childHeight * scaleFactor}px`,
                },
            });
        });

    return <ScaledChildren />;
}
