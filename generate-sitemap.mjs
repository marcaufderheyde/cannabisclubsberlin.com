import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';
import path from 'path'; // Import path module to construct paths

async function generate() {
    const siteRootURL = 'https://cannabisclubsberlin.com'
    const languages = ['de', 'en']; // Define languages
    for (const lang of languages) {
        const pages = await globby([
            // Adjusted paths to match the directory structure
            `.next/server/app/${lang}/**/*.html`,
            `!.next/server/app/${lang}/_not-found.html`, // Exclude specific files
            `!.next/server/app/${lang}/index.html`,
            `.next/server/app/${lang}/clubs/*.html`, // Include club pages
        ]);

        const siteUrl =
            lang === 'de'
                ? `${siteRootURL}/de`
                : `${siteRootURL}/en`;

        // use otherLanguage to create alternates, with hreflang rel
        const otherLanguage = lang =='de' ? 'en' : 'de';
        const alternativeSiteUrl =
        otherLanguage === 'de'
                ? `${siteRootURL}/de`
                : `${siteRootURL}/en`;

        let sitemap = `
                <?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" >
                    <url>
                        <loc>${siteUrl}</loc>
                        <xhtml:link
               rel="alternate"
               hreflang="${otherLanguage}"
               href="${alternativeSiteUrl}"/>
               <xhtml:link
               rel="alternate"
               hreflang="${lang}"
               href="${siteUrl}"/>
                        <lastmod>${new Date().toISOString()}</lastmod>
                    </url>
                `;

        for (const page of pages) {
            const route = page
                .replace(`.next/server/app/${lang}`, '')
                .replace('.html', '');

            const pageContent = `<url>
                        <loc>${siteUrl}${route}</loc>
                        <xhtml:link
               rel="alternate"
               hreflang="${otherLanguage}"
               href="${alternativeSiteUrl}${route}"/>
               <xhtml:link
               rel="alternate"
               hreflang="${lang}"
               href="${siteUrl}${route}"/>
                        <lastmod>${new Date().toISOString()}</lastmod>                  
                    </url>
                    `;

            sitemap += pageContent;
        }

        sitemap += `</urlset>`;

        // console.log('Generated Localised Sitemap:', sitemap); // Debugging statement
        console.log(`Generated Localised Sitemap ${lang}`);

        const formatted = await prettier.format(sitemap, {
            parser: 'html',
        });

        writeFileSync(path.join('out', `sitemap-${lang}.xml`), formatted); // Use path.join to construct file path
    }

    // generate sitemap index file here
    let sitemapIndex = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${siteRootURL}/sitemap-en.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${siteRootURL}/sitemap-de.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
    </sitemapindex>
                `;
    // console.log('Generated Sitemap Index:', sitemapIndex); // Debugging statement
    console.log('Generated Sitemap Index');

    const formatted = await prettier.format(sitemapIndex, {
        parser: 'html',
    });

    writeFileSync(path.join('out', `sitemap.xml`), formatted);

}

generate();
