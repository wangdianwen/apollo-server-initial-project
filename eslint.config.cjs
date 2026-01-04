const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = [
    {
        ignores: ['node_modules/', 'webpack.config.ts', 'build/', 'dist/'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json'],
            },
            globals: {
                browser: true,
                es2021: true,
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
            prettier: prettierPlugin,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'prettier/prettier': 'error',
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // Side effect imports.
                        ['^\\u0000'],
                        // Node builtins & packages starting with a letter (external packages).
                        ['^node:', '^[a-z]'],
                        // Scoped packages and other package imports.
                        ['^@?\\w'],
                        // Internal aliases (adjust to your path aliases).
                        ['^@src(/.*|$)'],
                        // Parent imports.
                        ['^\\.\\.(?!/?$)', '^\\.\\.\\/?$'],
                        // Sibling imports and index.
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        // Style imports.
                        ['^.+\\.s?css$'],
                    ],
                },
            ],
        },
    },
];
