'use client';

import { PropsWithChildren, FunctionComponent, useRef } from 'react';
import Close from '../Close/Close';
import Swipeable from '../OpenStreetMap/Swipeable';
import { Transition, TransitionStatus } from 'react-transition-group';

type DrawerProps = {
    readonly children: React.ReactElement;
    readonly className?: string;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly closeButtonColor?: string;
};

type Position = {
    x: string;
    y: string;
};

const Drawer: FunctionComponent<DrawerProps> = (
    props: PropsWithChildren<DrawerProps>
) => {
    const transformDuration: number = 300;
    const backgroundDelay: number = 100;
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
            transition: `transform ${transformDuration}ms ease ${transformDuration + backgroundDelay}ms`,
        },
        exited: {
            transform: `translateX(-100%)`,
            transition: `transform ${transformDuration}ms ease ${transformDuration + backgroundDelay}ms`,
        },
        unmounted: {
            transform: `translateX(-100%)`,
            transition: `transform ${transformDuration}ms ease ${transformDuration + backgroundDelay}ms `,
        },
    };

    const drawerRef = useRef(null);
    const drawerDelay: number = 400;
    const drawerDefaultTransitionStyle: React.CSSProperties = {
        transform: `translateX(-100%)`,
        transition: `transform ${transformDuration}ms ease `,
    };
    const drawerTransitionStyles: Record<
        TransitionStatus,
        React.CSSProperties
    > = {
        entering: {
            transform: `translateX(0%)`,
            transition: `transform ${transformDuration}ms ease ${drawerDelay}ms`,
        },
        entered: {
            transform: `translateX(0%)`,
            transition: `transform ${transformDuration}ms ease ${drawerDelay}ms`,
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
                timeout={transformDuration * 3}
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
                            'fixed z-50 min-w-full min-h-full top-0 left-0 bg-[#B6CF54]'
                        }
                    >
                        <Transition
                            nodeRef={drawerRef}
                            timeout={transformDuration}
                            in={props.isOpen}
                            unmountOnExit={true}
                            appear={true}
                        >
                            {(state) => (
                                <div
                                    ref={drawerRef}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    style={{
                                        ...drawerDefaultTransitionStyle,
                                        ...drawerTransitionStyles[state],
                                    }}
                                    className={
                                        'fixed min-h-full bg-transparent min-w-[80%] top-0 left-0 drop-shadow-lg ' +
                                        props.className
                                    }
                                >
                                    <div
                                        onClick={props.onClose}
                                        className='absolute top-[2em] right-[2em] z-[2]'
                                    >
                                        <Close
                                            color={
                                                props.closeButtonColor ?? 'grey'
                                            }
                                        />
                                    </div>
                                    {props.children}
                                </div>
                            )}
                        </Transition>
                    </div>
                )}
            </Transition>
        </Swipeable>
    );
};

export default Drawer;
