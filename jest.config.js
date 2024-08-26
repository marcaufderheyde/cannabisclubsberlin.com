module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.jest.json',
                babelConfig: true,
            },
        ],
        '^.+\\.(js|jsx|mjs)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^next-intl$': '<rootDir>/__mocks__/next-intl.js',
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
