// @ts-check
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
  }
   
export default withNextIntl(nextConfig);