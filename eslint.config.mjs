import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
    ...nextCoreWebVitals,
    {
        ignores: ['.next/**', 'out/**', 'node_modules/**', 'build/**'],
    },
    {
        rules: {
            'react-hooks/set-state-in-effect': 'warn',
            'react-hooks/refs': 'warn',
            'react-hooks/immutability': 'warn',
            'react-hooks/purity': 'warn',
            'react-hooks/static-components': 'warn',
        },
    },
];

export default eslintConfig;
