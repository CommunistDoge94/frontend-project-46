import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        jest: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    plugins: { js },
    extends: ['js/recommended'],
  },
])
