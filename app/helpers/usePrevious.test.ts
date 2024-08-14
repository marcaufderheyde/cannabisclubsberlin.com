import { render, renderHook } from '@testing-library/react';
import usePrevious from './usePrevious';

describe('usePrevious Hook', () => {
    it('should return undefined on initial render', () => {
        const { result } = renderHook(() => usePrevious('initial'));
        expect(result.current).toBeUndefined();
    });

    it('should return the previous value after an update', () => {
        const { result, rerender } = renderHook(
            ({ value }) => usePrevious(value),
            {
                initialProps: { value: 'initial' },
            }
        );

        // On initial render, the previous value should be undefined
        expect(result.current).toBeUndefined();

        // After rerender, it should return the initial value as previous
        rerender({ value: 'updated' });
        expect(result.current).toBe('initial');

        // After another rerender, it should return the updated value as previous
        rerender({ value: 'final' });
        expect(result.current).toBe('updated');
    });
});
