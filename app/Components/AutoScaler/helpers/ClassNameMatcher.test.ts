import ClassNameMatcher from './classNameMatcher';

describe('ClassNameMatcher', () => {
    describe('getCustomWidth', () => {
        it('should return the width value from a valid class name', () => {
            const className = 'w-[300px] h-[200px]';
            const width = ClassNameMatcher.getCustomWidth(className);
            expect(width).toBe('300px');
        });

        it('should return an empty string if no valid width class is found', () => {
            const className = 'h-[200px] text-lg';
            const width = ClassNameMatcher.getCustomWidth(className);
            expect(width).toBe('');
        });

        it('should return an empty string if the class name is empty', () => {
            const className = '';
            const width = ClassNameMatcher.getCustomWidth(className);
            expect(width).toBe('');
        });
    });

    describe('getCustomHeight', () => {
        it('should return the height value from a valid class name', () => {
            const className = 'w-[300px] h-[200px]';
            const height = ClassNameMatcher.getCustomHeight(className);
            expect(height).toBe('200px');
        });

        it('should return an empty string if no valid height class is found', () => {
            const className = 'w-[300px] text-lg';
            const height = ClassNameMatcher.getCustomHeight(className);
            expect(height).toBe('');
        });

        it('should return an empty string if the class name is empty', () => {
            const className = '';
            const height = ClassNameMatcher.getCustomHeight(className);
            expect(height).toBe('');
        });
    });
});
