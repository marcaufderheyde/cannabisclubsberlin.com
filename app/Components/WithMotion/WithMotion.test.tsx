import React from 'react';
import { render } from '@testing-library/react';
import withMotion from './WithMotion';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: 'motion.div',
    },
}));

describe('withMotion', () => {
    // Sample component to wrap
    const TestComponent = ({ text }: { text: string }) => <div>{text}</div>;
    const MotionTestComponent = withMotion(TestComponent);

    it('renders the wrapped component', () => {
        const { getByText } = render(<MotionTestComponent text="Hello" />);
        expect(getByText('Hello')).toBeInTheDocument();
    });

    it('passes motion props to motion.div', () => {
        const motionProps = {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
            variants: { visible: { opacity: 1 }, hidden: { opacity: 0 } },
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            exit: { opacity: 0 },
        };

        const { container } = render(
            <MotionTestComponent text="Hello" {...motionProps} />
        );
        const motionDiv = container.firstChild as HTMLElement;

        Object.entries(motionProps).forEach(([key, value]) => {
            if (key === 'transition' || key === 'variants') {
                expect(motionDiv.getAttribute(key)).toBe('[object Object]');
            } else {
                expect(motionDiv).toHaveAttribute(key, JSON.stringify(value));
            }
        });
    });

    it('passes non-motion props to the wrapped component', () => {
        const { getByText } = render(
            <MotionTestComponent text="Custom Text" />
        );
        expect(getByText('Custom Text')).toBeInTheDocument();
    });

    it('wraps the component with motion.div', () => {
        const { container } = render(<MotionTestComponent text="Hello" />);
        expect(container.firstChild?.nodeName).toBe('MOTION.DIV');
    });
});
