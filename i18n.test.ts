/**
 * i18n Configuration Tests
 * 
 * These tests verify the internationalization configuration remains valid.
 * Critical for ensuring routing works correctly for both 'en' and 'de' locales.
 */

describe('i18n Configuration', () => {
    // We test the configuration values directly without importing the actual module
    // since it uses Next.js-specific functions that require server context

    const EXPECTED_LOCALES = ['en', 'de'];

    describe('Locale Configuration', () => {
        it('should have expected locale files available', async () => {
            // Verify English messages exist
            const enMessages = await import('./messages/en.json');
            expect(enMessages).toBeDefined();
            expect(enMessages.default || enMessages).toBeTruthy();

            // Verify German messages exist
            const deMessages = await import('./messages/de.json');
            expect(deMessages).toBeDefined();
            expect(deMessages.default || deMessages).toBeTruthy();
        });

        it('should have matching translation keys between locales', async () => {
            const enMessages = await import('./messages/en.json');
            const deMessages = await import('./messages/de.json');

            const enKeys = Object.keys(enMessages.default || enMessages);
            const deKeys = Object.keys(deMessages.default || deMessages);

            // Both locales should have the same top-level keys
            expect(enKeys.sort()).toEqual(deKeys.sort());
        });
    });

    describe('Message Structure', () => {
        it('should have required translation sections in English', async () => {
            const enMessages = await import('./messages/en.json');
            const messages = enMessages.default || enMessages;

            // Check for critical translation sections that the app depends on
            expect(messages).toHaveProperty('AgeVerification');
            expect(messages).toHaveProperty('CookieBanner');
        });

        it('should have required translation sections in German', async () => {
            const deMessages = await import('./messages/de.json');
            const messages = deMessages.default || deMessages;

            // Check for critical translation sections that the app depends on
            expect(messages).toHaveProperty('AgeVerification');
            expect(messages).toHaveProperty('CookieBanner');
        });
    });
});
