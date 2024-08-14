import { generateSlug, pullClubsListContent, Club } from './clubsListContent';

describe('ClubsListContent Module', () => {
    describe('generateSlug', () => {
        it('should generate slugs by replacing spaces with hyphens', () => {
            const name = 'CSC High Ground Berlin e.V.';
            const expectedSlug = 'csc-high-ground-berlin-ev';
            const slug = generateSlug(name);
            expect(slug).toBe(expectedSlug);
        });

        it('should convert uppercase letters to lowercase', () => {
            const name = 'Green Social Club';
            const expectedSlug = 'green-social-club';
            const slug = generateSlug(name);
            expect(slug).toBe(expectedSlug);
        });

        it('should handle German umlauts correctly', () => {
            const name = 'Münchner Löwen e.V.';
            const expectedSlug = 'muenchner-loewen-ev';
            const slug = generateSlug(name);
            expect(slug).toBe(expectedSlug);
        });

        it('should remove special characters except hyphens', () => {
            const name = 'CSC! High@ Ground# Berlin$ e.V.';
            const expectedSlug = 'csc-high-ground-berlin-ev';
            const slug = generateSlug(name);
            expect(slug).toBe(expectedSlug);
        });

        it('should handle names with multiple spaces correctly', () => {
            const name = '   CSC   High    Ground  ';
            const expectedSlug = 'csc-high-ground';
            const slug = generateSlug(name);
            expect(slug).toBe(expectedSlug);
        });
    });

    describe('pullClubsListContent', () => {
        it('should return an array of clubs', () => {
            const clubs = pullClubsListContent();
            expect(Array.isArray(clubs)).toBe(true);
            expect(clubs.length).toBeGreaterThan(0);
        });

        it('should have clubs with valid slugs', () => {
            const clubs = pullClubsListContent();
            clubs.forEach((club: Club) => {
                expect(club.slug).toMatch(/^[a-z0-9-]+$/);
            });
        });

        it('should have consistent club data structure', () => {
            const clubs = pullClubsListContent();
            clubs.forEach((club: Club) => {
                expect(club).toHaveProperty('key');
                expect(club).toHaveProperty('name');
                expect(club).toHaveProperty('prices');
                expect(club).toHaveProperty('location');
                expect(club).toHaveProperty('description');
                expect(club).toHaveProperty('offerings');
                expect(club).toHaveProperty('harm_reduction');
                expect(club).toHaveProperty('imageUrl');
                expect(club).toHaveProperty('clubPageUrl');
                expect(club).toHaveProperty('slug');
                expect(club).toHaveProperty('geoLocation');
                expect(Array.isArray(club.geoLocation)).toBe(true);
            });
        });
    });
});
