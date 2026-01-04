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
            'simple-import-sort/imports': 'error',
        },
    },
];
