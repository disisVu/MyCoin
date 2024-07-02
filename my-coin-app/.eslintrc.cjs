module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser', // Use '@typescript-eslint/parser' for TypeScript
    ecmaFeatures: {
      jsx: true // Enable JSX parsing
    }
  },
  settings: {
    react: {
      version: '18.2' // Adjust based on your React version
    }
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    '@typescript-eslint', // Add '@typescript-eslint' plugin for TypeScript rules
    'tailwindcss'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    'no-console': 1,
    'no-lonely-if': 1,
    'no-unused-vars': 'off', // Disable ESLint's no-unused-vars because we use '@typescript-eslint/no-unused-vars'
    '@typescript-eslint/no-unused-vars': 'warn', // Enable TypeScript's no-unused-vars rule

    'no-trailing-spaces': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': [1, 'always'],
    'indent': ['warn', 2],
    'semi': [1, 'never'],
    'quotes': ['error', 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1,
    'tailwindcss/classnames-order': 'error'
  }
}
