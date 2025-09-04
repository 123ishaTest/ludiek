import { config } from '@123ishatest/ludiek-eslint-config/index.js';

export default [
  ...config,
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@tests', '@tests/*', '../tests', '../tests/*'],
              message: 'Do not import from @tests (or tests folder) in ludiek.',
            },
          ],
        },
      ],
    },
  },
];
