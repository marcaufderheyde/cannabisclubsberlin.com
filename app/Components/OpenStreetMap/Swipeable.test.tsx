import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Swipeable from './Swipeable';

describe('Swipeable', () => {
    let onLeftSwipe: jest.Mock;
    let onRightSwipe: jest.Mock;
    let onUpSwipe: jest.Mock;
    let onDownSwipe: jest.Mock;
    let onDownSwipeClose: jest.Mock;
    let onCancel: jest.Mock;

    beforeEach(() => {
        onLeftSwipe = jest.fn();
        onRightSwipe = jest.fn();
        onUpSwipe = jest.fn();
        onDownSwipe = jest.fn();
        onDownSwipeClose = jest.fn();
        onCancel = jest.fn();
    });

    const renderComponent = (props = {}) =>
        render(
            <Swipeable
                onLeftSwipe={onLeftSwipe}
                onRightSwipe={onRightSwipe}
                onUpSwipe={onUpSwipe}
                onDownSwipe={onDownSwipe}
                onDownSwipeClose={onDownSwipeClose}
                onCancel={onCancel}
                {...props}
            >
                <div>Swipe Me!</div>
            </Swipeable>
        );

    const simulateSwipe = (
        element: HTMLElement,
        start: [number, number],
        end: [number, number]
    ) => {
        fireEvent.touchStart(element, {
            changedTouches: [{ pageX: start[0], pageY: start[1] }],
        });
        fireEvent.touchMove(element, {
            changedTouches: [{ pageX: end[0], pageY: end[1] }],
        });
        fireEvent.touchEnd(element, {
            changedTouches: [{ pageX: end[0], pageY: end[1] }],
        });
    };

    it('calls onRightSwipe when swiped right', () => {
        const { getByText } = renderComponent();
        const element = getByText('Swipe Me!');

        simulateSwipe(element, [0, 0], [100, 0]);

        expect(onRightSwipe).toHaveBeenCalledTimes(1);
    });

    it('calls onLeftSwipe when swiped left', () => {
        const { getByText } = renderComponent();
        const element = getByText('Swipe Me!');

        simulateSwipe(element, [100, 0], [0, 0]);

        expect(onLeftSwipe).toHaveBeenCalledTimes(1);
    });

    it('calls onDownSwipe when swiped down', () => {
        const { getByText } = renderComponent();
        const element = getByText('Swipe Me!');

        simulateSwipe(element, [0, 0], [0, 100]);

        expect(onDownSwipe).toHaveBeenCalledTimes(1);
    });

    it('calls onUpSwipe when swiped up', () => {
        const { getByText } = renderComponent();
        const element = getByText('Swipe Me!');

        simulateSwipe(element, [0, 100], [0, 0]);

        expect(onUpSwipe).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when swipe is canceled', () => {
        const { getByText } = renderComponent();
        const element = getByText('Swipe Me!');

        // Simulate a swipe that doesn't meet the threshold
        simulateSwipe(element, [0, 0], [20, 0]);

        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('calls onDownSwipeClose when swiped down past boundary', () => {
        const { getByText } = renderComponent();
        const element = getByText('Swipe Me!');

        // Simulate a swipe down past the boundary
        simulateSwipe(element, [0, 0], [0, 200]);

        expect(onDownSwipeClose).toHaveBeenCalledTimes(1);
    });
});
