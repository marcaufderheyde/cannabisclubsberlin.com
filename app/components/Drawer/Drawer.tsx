'use client';

import { PropsWithChildren, FunctionComponent, useRef } from 'react';
import Close from '../Close/Close';
import Swipeable from '../OpenStreetMap/Swipeable';
import { Transition, TransitionStatus } from 'react-transition-group';

type DrawerProps = {
    readonly className?: string;
    readonly isOpen: boolean;
    readonly onClose: () => void;
};

type Position = {
    x: string;
    y: string;
};

const Drawer: FunctionComponent<DrawerProps> = (
    props: PropsWithChildren<DrawerProps>
) => {
    const transformDuration: number = 300;
    const drawerContainerRef = useRef(null);
    const drawerContainerDefaultTransitionStyle: React.CSSProperties = {
        transform: `translateX(-100%)`,
        transition: `transform ${transformDuration}ms ease`,
    };
    const drawerContainerTransitionStyles: Record<
        TransitionStatus,
        React.CSSProperties
    > = {
        entering: {
            transform: `translateX(0)`,
        },
        entered: {
            transform: `translateX(0)`,
        },
        exiting: {
            transform: `translateX(-100%)`,
        },
        exited: {
            transform: `translateX(-100%)`,
        },
        unmounted: {
            transform: `translateX(-100%)`,
        },
    };

    return (
        <Swipeable
            onLeftSwipe={() => {
                props.onClose();
            }}
        >
            <Transition
                nodeRef={drawerContainerRef}
                in={props.isOpen}
                timeout={transformDuration}
                unmountOnExit={true}
            >
                {(state) => (
                    <div
                        onClick={() => {
                            props.onClose();
                        }}
                        ref={drawerContainerRef}
                        style={{
                            ...drawerContainerDefaultTransitionStyle,
                            ...drawerContainerTransitionStyles[state],
                        }}
                        className={
                            'fixed z-50 min-w-full min-h-full top-0 left-0'
                        }
                    >
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className={
                                'fixed min-h-full bg-white min-w-[80%] top-0 left-0 drop-shadow-lg ' +
                                props.className
                            }
                        >
                            <div
                                onClick={props.onClose}
                                className='absolute top-[2em] right-[2em] z-[2]'
                            >
                                <Close color={'#828282'} />
                            </div>
                            {props.children}
                        </div>
                    </div>
                )}
            </Transition>
        </Swipeable>
    );
};

export default Drawer;
