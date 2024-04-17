import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';
import path from 'path'; // Import path module to construct paths

async function generate() {
    const languages = ['de', 'en']; // Define languages
    for (const lang of languages) {
        const pages = await globby([
            // Adjusted paths to match the directory structure
            `../.next/server/app/${lang}/**/*.html`,
            `!../.next/server/app/${lang}/_not-found.html`, // Exclude specific files
            `!../.next/server/app/${lang}/index.html`,
            `../.next/server/app/${lang}/clubs/*.html`, // Include club pages
        ]);

        console.log(pages);

        const siteUrl =
            lang === 'de'
                ? 'https://cannabisclubsberlin.com/de'
                : 'https://cannabisclubsberlin.com/en';

        let sitemap = `
                <?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    <url>
                        <loc>${siteUrl}</loc>            
                        <lastmod>${new Date().toISOString()}</lastmod>
                    </url>
                `;

        for (const page of pages) {
            const route = page
                .replace(`./project_name/.next/server/app/${lang}`, '')
                .replace('.html', '');

            const pageContent = `<url>
                        <loc>${siteUrl}${route}</loc>
                        <lastmod>${new Date().toISOString()}</lastmod>                  
                    </url>`;

            sitemap += pageContent;
        }

        sitemap += `</urlset>`;

        console.log('Generated Sitemap:', sitemap); // Debugging statement

        const formatted = await prettier.format(sitemap, {
            parser: 'html',
        });

        writeFileSync(path.join('public', `sitemap-${lang}.xml`), formatted); // Use path.join to construct file path
    }
}

generate();
