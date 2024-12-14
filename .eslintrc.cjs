module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    semi: [2, 'always'],
    'prettier/prettier': 'error',
    'keyword-spacing': 'error',
    'react/jsx-key': 'error',
    'no-console': 'warn',
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        endOfLine: 'auto',
        arrowParens: 'always',
      },
    ],
    'react/self-closing-comp': 'warn',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    //'import/order': ['warn', { 'newlines-between': 'always' }],
  },
};
