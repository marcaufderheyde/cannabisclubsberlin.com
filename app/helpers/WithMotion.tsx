import React, { ComponentType } from 'react';
import { motion, MotionProps } from 'framer-motion';

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
        return (
            <motion.div
                initial={initial}
                animate={animate}
                transition={transition}
                variants={variants}
                whileHover={whileHover}
                whileTap={whileTap}
                exit={exit}
            >
                <WrappedComponent {...(restProps as P)} />
            </motion.div>
        );
    };
}
