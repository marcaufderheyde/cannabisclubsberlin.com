import { renderHook } from '@testing-library/react';
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

        expect(result.current).toBeUndefined();

        rerender({ value: 'updated' });
        expect(result.current).toBe('initial');

        rerender({ value: 'final' });
        expect(result.current).toBe('updated');
    });
});
