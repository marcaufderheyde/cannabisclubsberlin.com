import { useCallback, useRef } from 'react';

type DebouncedFunction<T extends (...args: any[]) => any> = (
    ...args: Parameters<T>
) => void;

export default function useDebounceFunction<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): DebouncedFunction<T> {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedFunc = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                func(...args);
            }, delay);
        },
        [func, delay]
    );

    return debouncedFunc;
}
