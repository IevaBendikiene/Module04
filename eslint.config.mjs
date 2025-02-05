import globals from 'globals';
import pluginJs from '@eslint/js';
import { configs as wdioConfig } from 'eslint-plugin-wdio';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...globals.chai,
      },
    },
  },
  pluginJs.configs.recommended,
  wdioConfig['flat/recommended'],
  {
    ignores: [
      '**/**.conf.js',
      'jest.config.json',
      'node_modules/**',
      'mochawesome-report/**',
    ],
  },
];
