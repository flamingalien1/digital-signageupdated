module.exports = [
  {
    languageOptions: {
      parser: require('@babel/eslint-parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        requireConfigFile: false,
        babelOptions: {
          plugins: ['@babel/plugin-syntax-jsx']
        }
      },
      globals: Object.fromEntries(
        Object.entries({
          ...require('globals').browser,
          ...require('globals').node
        }).map(([k, v]) => [k.trim(), v])
      )
    },
    plugins: {
      react: require('eslint-plugin-react')
    },
    rules: {
      camelcase: [2, { properties: 'always' }],
      'no-undef': 1,
      'global-strict': 0,
      'no-extra-semi': 1,
      'no-underscore-dangle': 0,
      'no-console': [1, { allow: ['warn', 'error'] }],
      'global-require': 'off',
      'no-unused-vars': 1,
      'no-trailing-spaces': [1, { skipBlankLines: true }],
      'no-unreachable': 1,
      'no-alert': 0,
      'react/jsx-uses-react': 1,
      'react/jsx-uses-vars': 1,
      quotes: [2, 'single', { avoidEscape: true }],
      'jsx-quotes': [1, 'prefer-single'],
      semi: ['error', 'never'],
      'max-len': ['error', { code: 100 }],
      'multiline-comment-style': ['error', 'starred-block']
    }
  }
]
