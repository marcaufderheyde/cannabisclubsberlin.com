import React, { ComponentType } from 'react';
import { motion, MotionProps, Transition, Variants } from 'framer-motion';

export default function withMotion<P extends object>(
    WrappedComponent: ComponentType<P>
) {
    return function MotionComponent({
        initial,
        animate,
        transition,
        variants,
        whileHover,
        whileTap,
        exit,
        ...restProps
    }: MotionProps & P) {
        const stringifyProp = (prop: any) =>
            prop !== undefined && typeof prop === 'object'
                ? JSON.stringify(prop)
                : prop;

        return (
            <motion.div
                initial={stringifyProp(initial)}
                animate={stringifyProp(animate)}
                transition={transition as Transition}
                variants={variants as Variants}
                whileHover={stringifyProp(whileHover)}
                whileTap={stringifyProp(whileTap)}
                exit={stringifyProp(exit)}
            >
                <WrappedComponent {...(restProps as P)} />
            </motion.div>
        );
    };
}
