import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import eslintPluginPrettier from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['dist/**'],
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}', 'src/**/*.{js,ts}'],
    languageOptions: {
      parser: tsparser,
      globals: { ...globals.browser, process: true, __dirname: 'readonly' },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'off',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true },
      ],
      'prettier/prettier': [
        'error',
        { singleQuote: true, semi: true, trailingComma: 'es5' },
      ],
    },
  },
]
