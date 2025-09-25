import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        rules: {
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'eol-last': ['error', 'always']
        }
    },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: { ...globals.node, ...globals.jest, ...globals.browser } } },
    {
        files: ['coverage/lcov-report/*.js'],
        languageOptions: {
            globals: {
                document: 'readonly',
                window: 'readonly'
            }
        }
    }
]);
