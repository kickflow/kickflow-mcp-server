import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals' // Import globals

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off', // console を許可
    },
  },
  // Add configuration for JavaScript files
  {
    files: ['scripts/*.js'],
    languageOptions: {
      globals: {
        // Enable Node.js global variables
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module', // Assuming JS files are also ES Modules based on package.json
      },
    },
    plugins: {
      prettier: prettierPlugin, // Ensure prettier plugin is available for JS
    },
    rules: {
      'prettier/prettier': 'error', // Apply prettier rules to JS files too
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Basic unused vars check for JS
      // Add any other JS-specific rules if needed
    },
  },
)
