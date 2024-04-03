// @ts-check
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  }
   
export default withNextIntl(nextConfig);