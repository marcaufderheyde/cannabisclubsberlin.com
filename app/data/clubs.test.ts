import { clubs } from './clubs';

describe('Clubs Data Integrity', () => {
    describe('Required Fields', () => {
        it('should have a unique key for each club', () => {
            const keys = clubs.map(club => club.key);
            const uniqueKeys = new Set(keys);
            expect(uniqueKeys.size).toBe(keys.length);
        });

        it('should have a unique slug for each club', () => {
            const slugs = clubs.map(club => club.slug).filter(slug => slug !== '');
            const uniqueSlugs = new Set(slugs);
            expect(uniqueSlugs.size).toBe(slugs.length);
        });

        it('should have a name for each club', () => {
            clubs.forEach(club => {
                expect(club.name).toBeDefined();
                expect(club.name.length).toBeGreaterThan(0);
            });
        });

        it('should have an address for each club', () => {
            clubs.forEach(club => {
                expect(club.address).toBeDefined();
                expect(typeof club.address).toBe('string');
            });
        });

        it('should have a geoLocation array for each club', () => {
            clubs.forEach(club => {
                expect(club.geoLocation).toBeDefined();
                expect(Array.isArray(club.geoLocation)).toBe(true);
            });
        });
    });

    describe('GeoLocation Validation', () => {
        it('should have exactly 2 coordinates in each geoLocation', () => {
            clubs.forEach(club => {
                expect(club.geoLocation.length).toBe(2);
            });
        });

        it('should have valid latitude values (-90 to 90)', () => {
            clubs.forEach(club => {
                const latitude = club.geoLocation[0];
                expect(latitude).toBeGreaterThanOrEqual(-90);
                expect(latitude).toBeLessThanOrEqual(90);
            });
        });

        it('should have valid longitude values (-180 to 180)', () => {
            clubs.forEach(club => {
                const longitude = club.geoLocation[1];
                expect(longitude).toBeGreaterThanOrEqual(-180);
                expect(longitude).toBeLessThanOrEqual(180);
            });
        });

        it('should have numeric coordinates', () => {
            clubs.forEach(club => {
                expect(typeof club.geoLocation[0]).toBe('number');
                expect(typeof club.geoLocation[1]).toBe('number');
                expect(Number.isNaN(club.geoLocation[0])).toBe(false);
                expect(Number.isNaN(club.geoLocation[1])).toBe(false);
            });
        });

        // Note: Some clubs may have coordinates outside Berlin area
        // This is valid since the platform may expand to other regions
    });

    describe('Data Consistency', () => {
        it('should have boolean hasHRInformation field', () => {
            clubs.forEach(club => {
                expect(typeof club.hasHRInformation).toBe('boolean');
            });
        });

        it('should have string imageUrl field', () => {
            clubs.forEach(club => {
                expect(typeof club.imageUrl).toBe('string');
            });
        });

        it('should have at least one club', () => {
            expect(clubs.length).toBeGreaterThan(0);
        });
    });
});
