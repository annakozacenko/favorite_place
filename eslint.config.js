import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react/no-unsafe": "warn",
    "react/no-unused-state": "warn",
    "react/prefer-stateless-function": "warn",
    "react/self-closing-comp": "warn",
    "react/no-will-update-set-state": "warn",
    "react/no-this-in-sfc": "warn",
    "react/no-string-refs": "warn",
    "react/no-redundant-should-component-update": "warn",
    },
  },
)
