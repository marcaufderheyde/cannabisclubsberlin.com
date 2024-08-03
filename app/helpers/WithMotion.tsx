import React from 'react';
import { motion } from 'framer-motion';

export default function withMotion(WrappedComponent) {
    return function MotionComponent({
        initial,
        animate,
        transition,
        variants,
        whileHover,
        whileTap,
        exit,
        ...props
    }) {
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
                <WrappedComponent {...props} />
            </motion.div>
        );
    };
}
