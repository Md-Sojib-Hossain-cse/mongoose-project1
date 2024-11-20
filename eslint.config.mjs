import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-config-prettier';

// const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintPluginPrettierRecommended,
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  {
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
  {
    ignores: ['node_modules/*', '.env'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
