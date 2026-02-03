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

        it('should handle empty string input', () => {
            const name = '';
            const slug = generateSlug(name);
            expect(slug).toBe('');
        });

        it('should handle string with only special characters', () => {
            const name = '!@#$%^&*()';
            const slug = generateSlug(name);
            expect(slug).toBe('');
        });

        it('should handle German ß (eszett) correctly', () => {
            const name = 'Straße Club Berlin';
            const expectedSlug = 'strasse-club-berlin';
            const slug = generateSlug(name);
            expect(slug).toBe(expectedSlug);
        });

        it('should handle mixed umlauts and special characters', () => {
            const name = 'Münchner Größe! & Bäckerei';
            const expectedSlug = 'muenchner-groesse--baeckerei';
            const slug = generateSlug(name);
            expect(slug).toBe(expectedSlug);
        });

        it('should handle extremely long club names', () => {
            const name = 'A'.repeat(500) + ' Cannabis Social Club Berlin e.V.';
            const slug = generateSlug(name);
            expect(slug.length).toBeGreaterThan(0);
            expect(slug).toMatch(/^[a-z0-9-]+$/);
        });

        it('should handle only whitespace input', () => {
            const name = '     ';
            const slug = generateSlug(name);
            expect(slug).toBe('');
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
