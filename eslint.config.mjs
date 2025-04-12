import globals from 'globals';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
export default [
  {
    ignores: ['node_modules/*', 'dist/*', 'coverage', '*.ignore*'],
  },
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },

    rules: {
      'comma-spacing': 'error',
      'no-undef': 'error',
      'key-spacing': 'error',
      quotes: ['error', 'single'],
      'space-before-blocks': ['error', 'always'],
      'eol-last': ['error', 'always'],
      semi: ['error', 'always'],
      'comma-dangle': 'off',
      'no-console': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'implicit-arrow-linebreak': 'off',
      'object-curly-newline': 'off',
    },
  },
];
