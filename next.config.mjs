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
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias['three'] = 'three/src/Three.js';
        }
        return config;
    },
};

export default withNextIntl(nextConfig);
