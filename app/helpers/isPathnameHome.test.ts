import isPathNameHome from './isPathnameHome';

describe('isPathNameHome', () => {
    it('should return match for a root path with a two-letter language code', () => {
        const pathname = '/en';
        const match = isPathNameHome(pathname);
        expect(match).not.toBeNull();
        expect(match![1]).toBe('en');
    });

    it('should return match for a root path with a trailing slash and two-letter language code', () => {
        const pathname = '/de/';
        const match = isPathNameHome(pathname);
        expect(match).not.toBeNull();
        expect(match![1]).toBe('de');
    });

    it('should return null for a root path without a language code', () => {
        const pathname = '/';
        const match = isPathNameHome(pathname);
        expect(match).toBeNull();
    });

    it('should return null for a path with more than two letters after the slash', () => {
        const pathname = '/engl/';
        const match = isPathNameHome(pathname);
        expect(match).toBeNull();
    });

    it('should return null for a path with non-letter characters in the language code', () => {
        const pathname = '/e1/';
        const match = isPathNameHome(pathname);
        expect(match).toBeNull();
    });

    it('should return null for a path with additional path segments after the language code', () => {
        const pathname = '/en/about';
        const match = isPathNameHome(pathname);
        expect(match).toBeNull();
    });

    it('should return null for an empty path', () => {
        const pathname = '';
        const match = isPathNameHome(pathname);
        expect(match).toBeNull();
    });

    it('should return match for a path with uppercase language code', () => {
        const pathname = '/EN/';
        const match = isPathNameHome(pathname);
        expect(match).not.toBeNull();
        expect(match![1]).toBe('EN');
    });
});
